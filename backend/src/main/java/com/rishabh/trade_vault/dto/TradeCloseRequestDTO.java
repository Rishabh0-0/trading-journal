package com.rishabh.trade_vault.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class TradeCloseRequestDTO {

    @NotNull(message = "Exit price is required!")
    private BigDecimal exitPrice;

    @NotNull(message = "Exit date is required!")
    private LocalDate exitDate;

    private BigDecimal charges;

    public TradeCloseRequestDTO() {
    }

    public TradeCloseRequestDTO(BigDecimal exitPrice, LocalDate exitDate, BigDecimal charges) {
        this.exitPrice = exitPrice;
        this.exitDate = exitDate;
        this.charges = charges;
    }

    public BigDecimal getExitPrice() {
        return exitPrice;
    }

    public void setExitPrice(BigDecimal exitPrice) {
        this.exitPrice = exitPrice;
    }

    public LocalDate getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDate exitDate) {
        this.exitDate = exitDate;
    }

    public BigDecimal getCharges() {
        return charges;
    }

    public void setCharges(BigDecimal charges) {
        this.charges = charges;
    }
}
