package com.rishabh.trade_vault.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.model.TradeStatus;

public interface TradeRepository extends JpaRepository<Trade, Integer> {

    long countByStatus(TradeStatus status);

    @Query("SELECT SUM(t.pnl) FROM Trade t WHERE t.status != 'ACTIVE'")
    BigDecimal sumTotalPnl();
}
