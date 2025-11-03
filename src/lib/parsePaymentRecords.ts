export function parsePaymentRecords(paymentRecords: any[]) {
  const marketRecords = paymentRecords.filter(
    (paymentRecord) =>
      paymentRecord.name.value.receiver ==
      "0x23c11df86fad8d628fe9b7fb6bf0b27be231f995b476ae1cff2a227575e96fad"
  );
  marketRecords.sort((a, b) => b.version - a.version);
  return marketRecords.map((paymentRecord) => {
    const currency = paymentRecord.name.type.match(/<.+::(.+)>/)?.[1] ?? "";
    let amount;
    if (currency === "SUI") {
      amount = paymentRecord.name.value.payment_amount / 10 ** 9;
    } else {
      amount = paymentRecord.name.value.payment_amount / 10 ** 6;
    }
    return {
      digest: paymentRecord.digest,
      id: paymentRecord.objectId,
      nonce: paymentRecord.name.value.nonce,
      amount: amount,
      currency: currency,
      status: "completed",
    };
  });
}
