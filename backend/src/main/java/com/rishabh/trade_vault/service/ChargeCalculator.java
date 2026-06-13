package com.rishabh.trade_vault.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Service;

@Service
public class ChargeCalculator {

    public BigDecimal calculateDhanEquityDeliveryCharges(BigDecimal price, Integer quantity, String side) {
        if (price == null || quantity == null)
            return BigDecimal.ZERO;

        BigDecimal turnover = price.multiply(new BigDecimal(quantity));

        BigDecimal stt = turnover.multiply(new BigDecimal("0.001"));
        // Transaction Charges: 0.00345%
        BigDecimal txn = turnover.multiply(new BigDecimal("0.0000345"));
        // SEBI: 0.0001%
        BigDecimal sebi = turnover.multiply(new BigDecimal("0.000001"));

        // GST: 18% on (txn + sebi)
        BigDecimal gst = txn.add(sebi).multiply(new BigDecimal("0.18"));

        // Stamp Duty: 0.015% only on buy
        BigDecimal stamp = side.equals("BUY") ? turnover.multiply(new BigDecimal("0.00015")) : BigDecimal.ZERO;

        // DP Charges: ₹15.93 (₹13.50 + 18% GST) flat fee only on Sell side
        BigDecimal dp = side.equals("SELL") ? new BigDecimal("15.93") : BigDecimal.ZERO;

        BigDecimal total = stt.add(txn).add(sebi).add(gst).add(stamp).add(dp);
        return total.setScale(2, RoundingMode.HALF_UP);
    }

}
