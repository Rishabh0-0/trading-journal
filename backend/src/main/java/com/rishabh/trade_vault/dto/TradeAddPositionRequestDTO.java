package com.rishabh.trade_vault.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class TradeAddPositionRequestDTO {
    @NotNull(message = "Entry Price is required")
    private BigDecimal entryPrice;

    @NotNull(message = "Quantity is required")
    private Integer positionSize;

    private LocalDate entryDate;

    private BigDecimal charges;

    public TradeAddPositionRequestDTO() {
    }

    public TradeAddPositionRequestDTO(BigDecimal entryPrice, Integer positionSize, LocalDate entryDate,
            BigDecimal charges) {
        this.entryPrice = entryPrice;
        this.positionSize = positionSize;
        this.entryDate = entryDate;
        this.charges = charges;
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

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public BigDecimal getCharges() {
        return charges;
    }

    public void setCharges(BigDecimal charges) {
        this.charges = charges;
    }
}
