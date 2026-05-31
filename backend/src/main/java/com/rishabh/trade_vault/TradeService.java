package com.rishabh.trade_vault;

import java.util.List;

import org.springframework.stereotype.Service;

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
