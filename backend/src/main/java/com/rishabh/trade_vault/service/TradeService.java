package com.rishabh.trade_vault.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.rishabh.trade_vault.dto.DashboardStatsDTO;
import com.rishabh.trade_vault.dto.TradeAddPositionRequestDTO;
import com.rishabh.trade_vault.dto.TradeCloseRequestDTO;
import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.model.TradeStatus;
import com.rishabh.trade_vault.model.User;
import com.rishabh.trade_vault.repository.TradeRepository;
import com.rishabh.trade_vault.repository.UserRepository;

@Service
public class TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;
    private final ChargeCalculator chargeCalculator;

    public TradeService(TradeRepository tradeRepository, UserRepository userRepository,
            ChargeCalculator chargeCalculator) {
        this.tradeRepository = tradeRepository;
        this.userRepository = userRepository;
        this.chargeCalculator = chargeCalculator;
    }

    public Page<Trade> getAllTrades(Integer userId, Pageable pageable) {
        return tradeRepository.findByUserId(userId, pageable);
    }

    public Trade logTrade(Integer userId, Trade trade) {
        Optional<User> user = userRepository.findById(userId);

        if (!user.isPresent()) {
            throw new RuntimeException("Unauthorized!");
        }

        BigDecimal calculatedCharges = chargeCalculator.calculateDhanEquityDeliveryCharges(trade.getEntryPrice(),
                trade.getPositionSize(), "BUY");

        trade.setCharges(calculatedCharges);
        trade.setStatus(TradeStatus.ACTIVE);
        trade.setUser(user.get());

        return tradeRepository.save(trade);
    }

    public Trade closeTrade(Integer userId, Integer tradeId, TradeCloseRequestDTO closeRequest) {
        Trade trade = tradeRepository.findById(tradeId)
                .orElseThrow(() -> new RuntimeException("Trade not found with id: " + tradeId));

        if (!trade.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized!");
        }

        if (!trade.getStatus().equals(TradeStatus.ACTIVE)) {
            throw new RuntimeException("Trade " + tradeId + " is already closed!");
        }

        BigDecimal sellCharges = chargeCalculator.calculateDhanEquityDeliveryCharges(closeRequest.getExitPrice(),
                trade.getPositionSize(), "SELL");

        trade.setExitPrice(closeRequest.getExitPrice());
        trade.setExitDate(closeRequest.getExitDate());
        trade.setCharges(trade.getCharges().add(sellCharges));

        BigDecimal pnl = trade.getExitPrice().subtract(trade.getEntryPrice())
                .multiply(BigDecimal.valueOf(trade.getPositionSize())).subtract(trade.getCharges());
        trade.setPnl(pnl);

        if (pnl.compareTo(BigDecimal.ZERO) > 0) {
            trade.setStatus(TradeStatus.CLOSED_PROFIT);
        } else {
            trade.setStatus(TradeStatus.CLOSED_LOSS);
        }

        return tradeRepository.save(trade);
    }

    public Trade addPosition(Integer userId, Integer tradeId, TradeAddPositionRequestDTO addRequest) {
        Trade trade = tradeRepository.findById(tradeId)
                .orElseThrow(() -> new RuntimeException("Trade not found with id: " + tradeId));

        if (!trade.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized!");
        }

        if (!trade.getStatus().equals(TradeStatus.ACTIVE)) {
            throw new RuntimeException("Trade " + tradeId + " is already closed!");
        }

        BigDecimal oldTotalValue = trade.getEntryPrice().multiply(new BigDecimal(trade.getPositionSize()));
        BigDecimal newTotalValue = addRequest.getEntryPrice().multiply(new BigDecimal(addRequest.getPositionSize()));
        Integer newPositionSize = trade.getPositionSize() + addRequest.getPositionSize();
        BigDecimal newAveragePrice = oldTotalValue.add(newTotalValue).divide(new BigDecimal(newPositionSize), 2,
                java.math.RoundingMode.HALF_UP);

        BigDecimal additionalCharges = chargeCalculator.calculateDhanEquityDeliveryCharges(addRequest.getEntryPrice(),
                addRequest.getPositionSize(), "BUY");

        trade.setEntryPrice(newAveragePrice);
        trade.setPositionSize(newPositionSize);
        trade.setCharges(trade.getCharges().add(additionalCharges));

        return tradeRepository.save(trade);
    }

    public DashboardStatsDTO getDashboardStats(Integer userId) {
        long totalTrades = tradeRepository.countByUserId(userId);
        BigDecimal totalPnl = tradeRepository.sumTotalPnl(userId);
        double winingTrades = tradeRepository.countByUserIdAndStatus(userId, TradeStatus.CLOSED_PROFIT);
        double closedTrades = winingTrades + tradeRepository.countByUserIdAndStatus(userId, TradeStatus.CLOSED_LOSS);
        double winRate = closedTrades == 0 ? 0.0
                : (winingTrades * 100) / closedTrades;

        return new DashboardStatsDTO(totalTrades, totalPnl, winRate);
    }

}
