package com.rishabh.trade_vault.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rishabh.trade_vault.dto.DashboardStatsDTO;
import com.rishabh.trade_vault.dto.TradeAddPositionRequestDTO;
import com.rishabh.trade_vault.dto.TradeCloseRequestDTO;
import com.rishabh.trade_vault.dto.TradeRequestDTO;
import com.rishabh.trade_vault.dto.TradeResponseDTO;
import com.rishabh.trade_vault.mapper.TradeMapper;
import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.model.User;
import com.rishabh.trade_vault.service.TradeService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeService tradeService;
    private final TradeMapper tradeMapper;

    public TradeController(TradeService tradeService, TradeMapper tradeMapper) {
        this.tradeService = tradeService;
        this.tradeMapper = tradeMapper;
    }

    @PostMapping
    public TradeResponseDTO logTrade(@AuthenticationPrincipal User user,
            @Valid @RequestBody TradeRequestDTO requestDTO) {
        Trade newTrade = tradeMapper.toEntity(requestDTO);
        Trade savedTrade = tradeService.logTrade(user.getId(), newTrade);

        return tradeMapper.toDto(savedTrade);
    }

    @GetMapping
    public Page<TradeResponseDTO> getAllTrades(@AuthenticationPrincipal User user, Pageable pageable) {
        Page<Trade> tradePage = tradeService.getAllTrades(user.getId(), pageable);
        return tradePage.map(tradeMapper::toDto);
    }

    @PutMapping("/{tradeId}/close")
    public TradeResponseDTO closeTrade(@AuthenticationPrincipal User user, @PathVariable Integer tradeId,
            @RequestBody @Valid TradeCloseRequestDTO closeRequest) {
        return tradeMapper.toDto(tradeService.closeTrade(user.getId(), tradeId, closeRequest));
    }

    @GetMapping("/dashboard")
    public DashboardStatsDTO getDashboardStats(@AuthenticationPrincipal User user) {
        return tradeService.getDashboardStats(user.getId());
    }

    @PutMapping("/{tradeId}/add")
    public TradeResponseDTO addPosition(@AuthenticationPrincipal User user, @PathVariable Integer tradeId,
            @RequestBody @Valid TradeAddPositionRequestDTO addRequest) {
        return tradeMapper.toDto(tradeService.addPosition(user.getId(), tradeId, addRequest));
    }
}
