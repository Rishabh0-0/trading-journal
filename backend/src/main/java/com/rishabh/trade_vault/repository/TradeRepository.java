package com.rishabh.trade_vault.repository;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.model.TradeStatus;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

    Page<Trade> findByUserId(Integer userId, Pageable pageable);

    long countByUserId(Integer userId);

    long countByUserIdAndStatus(Integer userId, TradeStatus status);

    @Query("SELECT SUM(t.pnl) FROM Trade t WHERE t.user.id = :userId AND t.status != 'ACTIVE'")
    BigDecimal sumTotalPnl(Integer userId);
}
