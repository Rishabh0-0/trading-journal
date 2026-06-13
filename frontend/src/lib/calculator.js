/**
 * Calculates trading charges for Dhan (Equity Delivery)
 * Formula includes STT, Exchange Transaction Charges, SEBI, GST, and Stamp Duty.
 * Brokerage is assumed to be 0 for Equity Delivery on Dhan.
 * 
 * @param {number} price 
 * @param {number} quantity 
 * @param {'BUY' | 'SELL'} side 
 * @returns {number} total charges rounded to 2 decimals
 */
export function calculateDhanEquityDeliveryCharges(price, quantity, side) {
  if (!price || !quantity || price <= 0 || quantity <= 0) return 0;
  
  const turnover = price * quantity;
  
  // Brokerage: 0 for Equity Delivery
  const brokerage = 0;
  
  // STT: 0.1% on Buy and Sell
  const stt = turnover * 0.001;
  
  // Transaction Charges: NSE 0.00345%
  const txnCharge = turnover * 0.0000345;
  
  // SEBI Charges: ₹10 per crore (0.0001%)
  const sebiCharge = turnover * 0.000001;
  
  // GST: 18% on (Brokerage + Txn Charge + SEBI Charge)
  const gst = (brokerage + txnCharge + sebiCharge) * 0.18;
  
  // Stamp Duty: 0.015% only on Buy side
  const stampDuty = side === 'BUY' ? turnover * 0.00015 : 0;
  
  // DP Charges: ₹15.93 (₹13.50 + 18% GST) flat fee only on Sell side
  const dpCharges = side === 'SELL' ? 15.93 : 0;
  
  const totalCharges = brokerage + stt + txnCharge + sebiCharge + gst + stampDuty + dpCharges;
  
  return Number(totalCharges.toFixed(2));
}
