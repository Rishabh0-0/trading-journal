package com.rishabh.trade_vault.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rishabh.trade_vault.dto.DashboardStatsDTO;
import com.rishabh.trade_vault.dto.TradeCloseRequestDTO;
import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.model.TradeStatus;
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
        trade.setStatus(TradeStatus.ACTIVE);

        return tradeRepository.save(trade);
    }

    public Trade closeTrade(Integer tradeId, TradeCloseRequestDTO closeRequest) {
        Trade trade = tradeRepository.findById(tradeId)
                .orElseThrow(() -> new RuntimeException("Trade not found with id: " + tradeId));

        if (!trade.getStatus().equals(TradeStatus.ACTIVE)) {
            throw new RuntimeException("Trade " + tradeId + "is already closed!");
        }

        trade.setExitPrice(closeRequest.getExitPrice());
        trade.setExitDate(closeRequest.getExitDate());
        trade.setBrokerage(closeRequest.getBrokerage());

        BigDecimal pnl = trade.getExitPrice().subtract(trade.getEntryPrice())
                .multiply(BigDecimal.valueOf(trade.getPositionSize())).subtract(trade.getBrokerage());
        trade.setPnl(pnl);

        if (pnl.compareTo(BigDecimal.ZERO) > 0) {
            trade.setStatus(TradeStatus.CLOSED_PROFIT);
        } else {
            trade.setStatus(TradeStatus.CLOSED_LOSS);
        }

        return tradeRepository.save(trade);
    }

    public DashboardStatsDTO getDashboardStats() {
        long totalTrades = tradeRepository.count();
        BigDecimal totalPnl = tradeRepository.sumTotalPnl();
        double winingTrades = tradeRepository.countByStatus(TradeStatus.CLOSED_PROFIT);
        double closedTrades = winingTrades + tradeRepository.countByStatus(TradeStatus.CLOSED_LOSS);
        double winRate = closedTrades == 0 ? 0.0
                : (winingTrades * 100) / closedTrades;

        return new DashboardStatsDTO(totalTrades, totalPnl, winRate);
    }

}
