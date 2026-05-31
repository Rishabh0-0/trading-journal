package com.rishabh.trade_vault.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rishabh.trade_vault.model.TradeStrategy;

public class TradeRequestDTO {

    private String symbol;

    private TradeStrategy strategy;

    private LocalDate entryDate;

    private BigDecimal entryPrice;

    private Integer positionSize;

    public TradeRequestDTO() {

    }

    public TradeRequestDTO(String symbol, TradeStrategy strategy, LocalDate entryDate, BigDecimal entryPrice,
            Integer positionSize) {
        this.symbol = symbol;
        this.strategy = strategy;
        this.entryDate = entryDate;
        this.entryPrice = entryPrice;
        this.positionSize = positionSize;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
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

    public BigDecimal getEntryPrice() {
        return entryPrice;
    }

    public void setEntryPrice(BigDecimal entryPrice) {
        this.entryPrice = entryPrice;
    }

    public Integer getPositionSize() {
        return positionSize;
    }

    public void setPositionSize(Integer positionSize) {
        this.positionSize = positionSize;
    }

}
