import { useState, useMemo, useEffect } from "react";
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

const STORAGE_KEY = "selectedShopId";

export default function Dashboard() {
  const [shopId, setShopId] = useState<string>(() => {
    // Get initial value from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) || "";
    }
    return "";
  });
  const { paymentRecords } = useGetPaymentRecords();

  // Save to localStorage whenever shopId changes
  useEffect(() => {
    if (shopId) {
      localStorage.setItem(STORAGE_KEY, shopId);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [shopId]);

  // Filter last day's data and compute stats
  // TODO: Add payment_type and timestamp to match the actual data structure
  // Currently, useGetPaymentRecords does not return payment_type and timestamp,
  // so you may need to query events directly or extend parsePaymentRecords
  const stats = useMemo<DashboardStats>(() => {
    const walletRecords: any[] = [];
    const circleRecords: any[] = [];
    const cardRecords: any[] = [];
    let totalUsdc = 0;
    let totalSui = 0;

    // payment_type may be missing in paymentRecords
    // Adjust according to the real data shape
    // For now, consider all as Wallet or query events directly
    paymentRecords.forEach((record) => {
      if (record.currency === "USDC") {
        totalUsdc += record.amount || 0;
      } else if (record.currency === "SUI") {
        totalSui += record.amount || 0;
      }

      // Classify by payment_type
      // Adjust to the actual data structure
      // In parsePaymentEvent you can access payment_type.variant
      const paymentType = record.paymentType || "Wallet";
      if (paymentType === "Wallet" || paymentType === "wallet") {
        walletRecords.push(record);
      } else if (paymentType === "Circle" || paymentType === "circle") {
        circleRecords.push(record);
      } else if (paymentType === "Card" || paymentType === "card") {
        cardRecords.push(record);
      } else {
        // Default to Wallet
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

  // Shop ID list (example - should come from API or state management)
  const shopIds = ["shop-1", "shop-2", "shop-3"];

  return (
    <div className="mx-auto w-full max-w-7xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Shop</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label htmlFor="shop-select" className="text-sm font-medium">
              Currently selected shop:
            </label>
            <Select
              id="shop-select"
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              className="w-64"
            >
              <option value="">Select a shop</option>
              <option value="0x4960b8dc38cc80df9a548bd72ce09d157e4f5e32c570973cb54c9a634bcaa0d8">
                Example Shop
              </option>
              {shopIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Wallet Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.walletCount}</div>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Circle Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.circleCount}</div>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Card Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.cardCount}</div>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              USDC Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatAmount(stats.totalUsdc)} USDC
            </div>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">SUI Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatAmount(stats.totalSui)} SUI
            </div>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
