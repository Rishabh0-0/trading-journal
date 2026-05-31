package com.rishabh.trade_vault.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.repository.TradeRepository;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    public Trade logTrade(Trade trade) {
        return tradeRepository.save(trade);
    }

}
