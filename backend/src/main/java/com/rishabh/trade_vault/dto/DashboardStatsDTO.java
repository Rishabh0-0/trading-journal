package com.rishabh.trade_vault.dto;

import java.math.BigDecimal;

public class DashboardStatsDTO {
    private long totalTrades;

    private BigDecimal totalPnl;

    private double winRate;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalTrades, BigDecimal totalPnl, double winRate) {
        this.totalTrades = totalTrades;
        this.totalPnl = totalPnl;
        this.winRate = winRate;
    }

    public long getTotalTrades() {
        return totalTrades;
    }

    public void setTotalTrades(long totalTrades) {
        this.totalTrades = totalTrades;
    }

    public BigDecimal getTotalPnl() {
        return totalPnl;
    }

    public void setTotalPnl(BigDecimal totalPnl) {
        this.totalPnl = totalPnl;
    }

    public double getWinRate() {
        return winRate;
    }

    public void setWinRate(double winRate) {
        this.winRate = winRate;
    }
}
