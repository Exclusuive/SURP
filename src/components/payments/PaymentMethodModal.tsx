import { useEffect, useState } from "react";
import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import PaymentIcon from "./PaymentIcon";

type PaymentMethod = "wallet" | "card" | "moonpay" | "circle";

type PaymentMethodModalProps = {
  open: boolean;
  amount: number;
  currency?: string;
  onClose: () => void;
  onSelect: (method: PaymentMethod) => void;
};

export default function PaymentMethodModal({
  open,
  amount,
  currency = "USDC",
  onClose,
  onSelect,
}: PaymentMethodModalProps) {
  const currentAccount = useCurrentAccount();
  const normalizedCurrency = (currency ?? "").toUpperCase();
  const [walletPayment, setWalletPayment] = useState(false);
  const isSui = normalizedCurrency === "SUI";
  const isUsdc = normalizedCurrency === "USDC";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-5 shadow-xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">결제 방법 선택</h2>
          <p className="mt-1 text-sm text-gray-600">
            결제 금액 {amount} {currency}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {currentAccount ? (
            <PaymentIcon
              link="wallet"
              disabled={false}
              onSelect={() => onSelect("wallet")}
            />
          ) : (
            <ConnectModal
              trigger={
                <PaymentIcon
                  link="wallet"
                  disabled={false}
                  onSelect={() => {
                    setWalletPayment(true);
                  }}
                />
              }
              open={walletPayment}
              onOpenChange={(modalOpen) => {
                if (!modalOpen) {
                  onSelect("wallet");
                  onClose();
                }
              }}
            />
          )}

          {isSui && (
            <PaymentIcon
              link="moonpay"
              disabled={true}
              onSelect={() => onSelect("moonpay")}
            />
          )}

          {isUsdc && (
            <PaymentIcon
              link="circle"
              disabled={true}
              onSelect={() => onSelect("circle")}
            />
          )}

          <PaymentIcon
            link="card"
            disabled={true}
            onSelect={() => onSelect("card")}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="text-sm text-gray-600 underline-offset-4 hover:underline"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export type { PaymentMethod };
