import { useState, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useGetPaymentRecords } from "@/hooks/getData/useGetPaymentRecords";
import { formatAmount } from "@/lib/utils";

interface DashboardStats {
  walletCount: number;
  circleCount: number;
  cardCount: number;
  totalUsdc: number;
  totalSui: number;
}

export default function DashboardPage() {
  const [shopId, setShopId] = useState<string>("");
  const { paymentRecords } = useGetPaymentRecords();

  // 지난 1일간의 데이터 필터링 및 통계 계산
  // TODO: 실제 데이터 구조에 맞게 payment_type과 timestamp 정보를 추가해야 함
  // 현재는 useGetPaymentRecords가 payment_type과 timestamp를 반환하지 않으므로
  // 이벤트를 직접 쿼리하거나 parsePaymentRecords를 확장해야 할 수 있음
  const stats = useMemo<DashboardStats>(() => {
    const walletRecords: any[] = [];
    const circleRecords: any[] = [];
    const cardRecords: any[] = [];
    let totalUsdc = 0;
    let totalSui = 0;

    // paymentRecords에서 payment_type 정보가 없을 수 있으므로
    // 실제 데이터 구조에 맞게 조정 필요
    // 현재는 모든 레코드를 Wallet로 간주하거나, 이벤트를 직접 쿼리해야 함
    paymentRecords.forEach((record) => {
      if (record.currency === "USDC") {
        totalUsdc += record.amount || 0;
      } else if (record.currency === "SUI") {
        totalSui += record.amount || 0;
      }

      // payment_type에 따라 분류
      // 실제 데이터 구조에 맞게 조정 필요
      // parsePaymentEvent를 보면 payment_type.variant로 접근 가능
      const paymentType = record.paymentType || "Wallet";
      if (paymentType === "Wallet" || paymentType === "wallet") {
        walletRecords.push(record);
      } else if (paymentType === "Circle" || paymentType === "circle") {
        circleRecords.push(record);
      } else if (paymentType === "Card" || paymentType === "card") {
        cardRecords.push(record);
      } else {
        // 기본값으로 Wallet에 추가
        walletRecords.push(record);
      }
    });

    return {
      walletCount: walletRecords.length,
      circleCount: circleRecords.length,
      cardCount: cardRecords.length,
      totalUsdc,
      totalSui,
    };
  }, [paymentRecords]);

  // 상점 ID 목록 (예시 - 실제로는 API나 상태 관리에서 가져와야 함)
  const shopIds = ["shop-1", "shop-2", "shop-3"];

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">대시보드</h1>
        </div>

        {/* 상점 ID 선택 */}
        <Card>
          <CardHeader>
            <CardTitle>상점 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label htmlFor="shop-select" className="text-sm font-medium">
                현재 선택된 상점:
              </label>
              <Select
                id="shop-select"
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
                className="w-64"
              >
                <option value="">상점을 선택하세요</option>
                {shopIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </Select>
              {shopId && (
                <span className="text-sm text-gray-600">
                  선택된 상점: <strong>{shopId}</strong>
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 트랜잭션 통계 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Wallet 트랜잭션
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.walletCount}</div>
              <p className="text-sm text-gray-600 mt-1">지난 24시간</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Circle 트랜잭션
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.circleCount}</div>
              <p className="text-sm text-gray-600 mt-1">지난 24시간</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Card 트랜잭션
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.cardCount}</div>
              <p className="text-sm text-gray-600 mt-1">지난 24시간</p>
            </CardContent>
          </Card>
        </div>

        {/* 수익 통계 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">USDC 수익</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatAmount(stats.totalUsdc)} USDC
              </div>
              <p className="text-sm text-gray-600 mt-1">지난 24시간</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">SUI 수익</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatAmount(stats.totalSui)} SUI
              </div>
              <p className="text-sm text-gray-600 mt-1">지난 24시간</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
