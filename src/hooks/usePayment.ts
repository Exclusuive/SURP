import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
const USDC_TYPE =
  "0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC";
const SUI_TYPE = "0x2::sui::SUI";

export function usePayment() {
  const account = useCurrentAccount();
  const { data: coins } = useSuiClientQuery("getAllCoins", {
    owner: account?.address || "",
  });
  const usdcCoins = coins?.data.filter((coin) => coin.coinType === USDC_TYPE);
  const {
    mutate: signAndExecuteTransaction,
    isPending,
    error,
    isSuccess,
  } = useSignAndExecuteTransaction();

  const pay = ({
    amount,
    currency,
  }: {
    amount: number;
    currency: "USDC" | "SUI";
    coins?: any[];
  }) => {
    if (!account) return;

    const tx = new Transaction();
    let coin;
    let amountToUse = amount;

    if (currency === "SUI") {
      amountToUse = amountToUse * 10 ** 9;
      coin = tx.splitCoins(tx.gas, [amountToUse]);
    } else {
      if (usdcCoins) {
        amountToUse = amountToUse * 10 ** 6;
        coin = tx.splitCoins(usdcCoins[0].coinObjectId, [amountToUse]);
      } else {
        return;
      }
    }
    tx.moveCall({
      package:
        "0x7e069abe383e80d32f2aec17b3793da82aabc8c2edf84abbf68dd7b719e71497",
      module: "payment_kit",
      function: "process_registry_payment",
      arguments: [
        tx.object(
          "0x4960b8dc38cc80df9a548bd72ce09d157e4f5e32c570973cb54c9a634bcaa0d8"
        ),
        tx.pure.string(crypto.randomUUID()),
        tx.pure.u64(amountToUse),
        coin,
        tx.pure.vector("address", [
          "0x23c11df86fad8d628fe9b7fb6bf0b27be231f995b476ae1cff2a227575e96fad",
        ]),
        tx.object(
          "0x0000000000000000000000000000000000000000000000000000000000000006"
        ),
      ],
      typeArguments: [currency === "USDC" ? USDC_TYPE : SUI_TYPE],
    });
    tx.setGasBudget(10000000);
    tx.setGasPrice(1000);

    console.log("tx", tx);

    signAndExecuteTransaction(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("executed transaction", result);
        },
      }
    );
  };

  return {
    pay,
    isPending,
    error,
    isSuccess,
  };
}
