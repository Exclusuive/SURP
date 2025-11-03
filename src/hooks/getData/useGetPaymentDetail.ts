import { useEffect, useState } from "react";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { parsePaymentEvent } from "@/lib/parsePaymentEvent";

export function useGetPaymentDetail({ objectId }: { objectId: string }) {
  const [paymentDetail, setPaymentDetail] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previousTransaction, setPreviousTransaction] = useState<any>(null);

  const { data } = useSuiClientQuery("getObject", {
    id: objectId,
    options: {
      showType: true,
      showContent: true,
      showOwner: true,
      showPreviousTransaction: true,
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setPreviousTransaction(data.data?.previousTransaction);
  }, [data]);

  const { data: eventsData } = useSuiClientQuery("queryEvents", {
    query: {
      Transaction: previousTransaction ? previousTransaction : "",
    },
  });

  console.log("eventsData", eventsData);

  useEffect(() => {
    if (!eventsData) {
      setIsPending(false);
      return;
    }
    setPaymentDetail(parsePaymentEvent(eventsData.data[0]));
  }, [eventsData]);

  return {
    paymentDetail,
    isPending,
    error,
  };
}
