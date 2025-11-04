import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount, formatTimestamp } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useGetPaymentDetail } from "@/hooks/getData/useGetPaymentDetail";

export default function PaymentDetail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { paymentDetail } = useGetPaymentDetail({
    objectId: params.get("id") ?? "",
  });

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-3xl p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Payement Detail</h1>
          <div className="flex-1" />

          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Back
          </Button>
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
                  {paymentDetail?.paymentType ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4 sm:col-span-2">
                <dt className="text-sm text-muted-foreground">발신자</dt>
                <dd className="mt-1 break-all text-base font-medium">
                  {paymentDetail?.sender ?? "—"}
                </dd>
              </div>
              <div className="rounded-md border p-4 sm:col-span-2">
                <dt className="text-sm text-muted-foreground">수신자</dt>
                <dd className="mt-1 break-all text-base font-medium">
                  {paymentDetail?.receiver ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4 sm:col-span-2">
                <dt className="text-sm text-muted-foreground">Nonce</dt>
                <dd className="mt-1 break-all text-base font-medium">
                  {paymentDetail?.nonce ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">금액</dt>
                <dd className="mt-1 text-base font-medium">
                  {formatAmount(paymentDetail?.amount ?? 0)}{" "}
                  {paymentDetail?.coinType ?? "—"}
                </dd>
              </div>

              <div className="rounded-md border p-4">
                <dt className="text-sm text-muted-foreground">생성 시각</dt>
                <dd className="mt-1 text-base font-medium">
                  {formatTimestamp(Number(paymentDetail?.timestampMs) ?? 0)}
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
