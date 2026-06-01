package com.rishabh.trade_vault.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rishabh.trade_vault.model.TradeStrategy;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TradeRequestDTO {

    @NotBlank(message = "Symbol cannot be empty!")
    private String symbol;

    private TradeStrategy strategy;

    private LocalDate entryDate;

    @NotNull(message = "Entry price is required!")
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
