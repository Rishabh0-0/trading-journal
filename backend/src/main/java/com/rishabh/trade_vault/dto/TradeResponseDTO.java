package com.rishabh.trade_vault.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rishabh.trade_vault.model.TradeStatus;
import com.rishabh.trade_vault.model.TradeStrategy;

public class TradeResponseDTO {
    private Integer id;

    private String symbol;

    private TradeStatus status;

    private TradeStrategy strategy;

    private LocalDate entryDate;

    private LocalDate exitDate;

    private BigDecimal entryPrice;

    private BigDecimal exitPrice;

    private Integer positionSize;

    private BigDecimal charges;

    private BigDecimal pnl;

    public TradeResponseDTO() {
    }

    public TradeResponseDTO(Integer id, String symbol, TradeStatus status, TradeStrategy strategy, LocalDate entryDate,
            LocalDate exitDate, BigDecimal entryPrice, BigDecimal exitPrice, Integer positionSize, BigDecimal charges,
            BigDecimal pnl) {
        this.id = id;
        this.symbol = symbol;
        this.status = status;
        this.strategy = strategy;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
        this.entryPrice = entryPrice;
        this.exitPrice = exitPrice;
        this.positionSize = positionSize;
        this.charges = charges;
        this.pnl = pnl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public TradeStatus getStatus() {
        return status;
    }

    public void setStatus(TradeStatus status) {
        this.status = status;
    }

    public TradeStrategy getStrategy() {
        return strategy;
    }

    public void setStrategy(TradeStrategy strategy) {
        this.strategy = strategy;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public LocalDate getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDate exitDate) {
        this.exitDate = exitDate;
    }

    public BigDecimal getEntryPrice() {
        return entryPrice;
    }

    public void setEntryPrice(BigDecimal entryPrice) {
        this.entryPrice = entryPrice;
    }

    public BigDecimal getExitPrice() {
        return exitPrice;
    }

    public void setExitPrice(BigDecimal exitPrice) {
        this.exitPrice = exitPrice;
    }

    public Integer getPositionSize() {
        return positionSize;
    }

    public void setPositionSize(Integer positionSize) {
        this.positionSize = positionSize;
    }

    public BigDecimal getCharges() {
        return charges;
    }

    public void setCharges(BigDecimal charges) {
        this.charges = charges;
    }

    public BigDecimal getPnl() {
        return pnl;
    }

    public void setPnl(BigDecimal pnl) {
        this.pnl = pnl;
    }

}
