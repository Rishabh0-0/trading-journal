package com.rishabh.trade_vault.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rishabh.trade_vault.model.Trade;

public interface TradeRepository extends JpaRepository<Trade, Integer> {

}
