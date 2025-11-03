import { useGetPaymentRecords } from "@/hooks/getData/useGetPaymentRecords";
import { Button } from "../ui/button";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom";

export default function RealtimePayments() {
  const { paymentRecords } = useGetPaymentRecords();
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Payment Records</h2>
        <span className="text-sm text-gray-500">
          Recent {paymentRecords.length} records
        </span>
      </div>
      <div className="overflow-hidden rounded border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Currency</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentRecords.map((p) => (
              <tr
                key={p.id}
                className="border-t"
                onClick={() => {
                  navigate(paths.admin.payment.getHref(p.id));
                }}
              >
                <td className="px-4 py-2 font-mono text-xs text-gray-600">
                  {p.id}
                </td>
                <td className="px-4 py-2">{p.currency}</td>
                <td className="px-4 py-2">
                  {p.amount} {p.currency}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${
                      p.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Button variant="default">Collect</Button>
                    <Button variant="destructive">Refund</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
