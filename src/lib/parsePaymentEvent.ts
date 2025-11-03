export function parsePaymentEvent(paymentEvent: any) {
  const parsedJson = paymentEvent.parsedJson;
  const currency = parsedJson.coin_type.split("::")[2] ?? "";
  let amount;
  if (currency === "SUI") {
    amount = parsedJson.payment_amount / 10 ** 9;
  } else {
    amount = parsedJson.payment_amount / 10 ** 6;
  }
  return {
    paymentType: parsedJson.payment_type.variant,
    nonce: parsedJson.nonce,
    amount: amount,
    sender: paymentEvent.sender,
    receiver: parsedJson.receiver,
    coinType: currency,
    timestampMs: parsedJson.timestamp_ms,
  };
}
