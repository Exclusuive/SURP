import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatAmount,
  formatTimestamp,
  toNumberOrUndefined,
} from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

type PaymentType = "Registry" | "Ephemeral";

type PaymentDetailData = {
  paymentType: PaymentType;
  nonce: string;
  amount: number;
  receiver: string;
  coinType: string;
  timestampMs: number;
};

export default function PaymentDetail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const data: Partial<PaymentDetailData> = useMemo(() => {
    const paymentTypeParam = params.get("paymentType");
    const paymentType =
      paymentTypeParam === "Registry" || paymentTypeParam === "Ephemeral"
        ? paymentTypeParam
        : undefined;

    return {
      paymentType,
      nonce: params.get("nonce") ?? undefined,
      amount: toNumberOrUndefined(params.get("amount")),
      receiver: params.get("receiver") ?? undefined,
      coinType: params.get("coinType") ?? undefined,
      timestampMs: toNumberOrUndefined(params.get("timestampMs")),
    };
  }, [params]);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-3xl p-4">
        <div className="mb-4 flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold">Payement Detail</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>결제 상세</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">결제 타입</dt>
                <dd className="mt-1 text-base font-medium">
                  {data.paymentType ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4 sm:col-span-2">
                <dt className="text-sm text-muted-foreground">Nonce</dt>
                <dd className="mt-1 break-all text-base font-medium">
                  {data.nonce ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">금액</dt>
                <dd className="mt-1 text-base font-medium">
                  {formatAmount(data.amount)}
                </dd>
              </div>

              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">수신자</dt>
                <dd className="mt-1 break-all text-base font-medium">
                  {data.receiver ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">코인 타입</dt>
                <dd className="mt-1 break-all text-base font-medium">
                  {data.coinType ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">생성 시각</dt>
                <dd className="mt-1 text-base font-medium">
                  {formatTimestamp(data.timestampMs)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="default"
                onClick={() => {
                  console.log("Collect clicked");
                }}
              >
                Collect
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  console.log("Refund clicked");
                }}
              >
                Refund
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
