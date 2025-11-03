import { useEffect, useState } from "react";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { parsePaymentRecords } from "@/lib/parsePaymentRecords";

export function useGetPaymentRecords() {
  const [paymentRecords, setPaymentRecords] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data } = useSuiClientQuery("getDynamicFields", {
    parentId:
      "0x4960b8dc38cc80df9a548bd72ce09d157e4f5e32c570973cb54c9a634bcaa0d8",
  });

  useEffect(() => {
    if (!data) {
      setIsPending(false);
      return;
    }
    console.log("data", data);
    const parsedPaymentRecords = parsePaymentRecords(data.data);
    setPaymentRecords(parsedPaymentRecords);
  }, [data]);

  return {
    paymentRecords,
    isPending,
    error,
  };
}
