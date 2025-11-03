import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PaymentMethodModal, {
  type PaymentMethod,
} from "@/components/payments/PaymentMethodModal";
import { usePayment } from "@/hooks/usePayment";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function PaymentPage() {
  const [open, setOpen] = useState(false);
  const { pay, isSuccess } = usePayment();
  const account = useCurrentAccount();

  const [amount, setAmount] = useState<number>(10);
  const [currency, setCurrency] = useState<"USDC" | "SUI">("USDC");
  const SUI_FAUCET_URL = "https://faucet.testnet.sui.io";
  const USDC_FAUCET_URL = "https://faucet.circle.com/";

  const handleSelect = (method: PaymentMethod) => {
    if (method === "wallet" && account) {
      pay({ amount, currency });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <div className="mx-auto max-w-md space-y-6 px-6 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>결제 테스트 페이지</CardTitle>
          <CardDescription>아래 금액으로 결제를 진행합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">결제 금액</label>
              <Input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="금액을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-600">결제 종류</label>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "USDC" | "SUI")}
              >
                <option value="USDC">USDC</option>
                <option value="SUI">SUI</option>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setOpen(true)}>
            결제하기
          </Button>
        </CardFooter>
      </Card>

      <div>
        <div className="flex flex-col space-y-1.5 px-6 pb-6">
          <h3 className="text-lg font-semibold leading-none">
            테스트 토큰 받기
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="bg-blue-300">
              <a
                href={SUI_FAUCET_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sui Faucet
              </a>
            </Button>
            <Button asChild variant="outline" className="bg-gray-100">
              <a
                href={USDC_FAUCET_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                USDC Faucet
              </a>
            </Button>
          </div>
        </div>
      </div>

      <PaymentMethodModal
        open={open}
        amount={amount}
        currency={currency}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
}
