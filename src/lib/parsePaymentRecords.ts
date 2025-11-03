export function parsePaymentRecords(paymentRecords: any[]) {
  console.log("paymentRecords", paymentRecords);
  const marketRecords = paymentRecords.filter(
    (paymentRecord) =>
      paymentRecord.name.value.receiver ==
      "0x23c11df86fad8d628fe9b7fb6bf0b27be231f995b476ae1cff2a227575e96fad"
  );
  return marketRecords.map((paymentRecord) => {
    return {
      digest: paymentRecord.digest,
      id: paymentRecord.objectId,
      nonce: paymentRecord.name.value.nonce,
      amount: paymentRecord.name.value.payment_amount / 10 ** 9,
      currency: paymentRecord.name.type.match(/<.+::(.+)>/)?.[1] ?? "",
      status: "completed",
    };
  });
}
