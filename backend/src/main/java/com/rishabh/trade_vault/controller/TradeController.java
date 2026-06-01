package com.rishabh.trade_vault.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rishabh.trade_vault.dto.TradeCloseRequestDTO;
import com.rishabh.trade_vault.dto.TradeRequestDTO;
import com.rishabh.trade_vault.dto.TradeResponseDTO;
import com.rishabh.trade_vault.mapper.TradeMapper;
import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.service.TradeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeService tradeService;
    private final TradeMapper tradeMapper;

    public TradeController(TradeService tradeService, TradeMapper tradeMapper) {
        this.tradeService = tradeService;
        this.tradeMapper = tradeMapper;
    }

    @PostMapping
    public TradeResponseDTO logTrade(@Valid @RequestBody TradeRequestDTO requestDTO) {
        Trade newTrade = tradeMapper.toEntity(requestDTO);
        Trade savedTrade = tradeService.logTrade(newTrade);

        return tradeMapper.toDto(savedTrade);
    }

    @GetMapping
    public List<TradeResponseDTO> getAllTrades() {
        List<Trade> allTrades = tradeService.getAllTrades();
        return allTrades.stream().map(tradeMapper::toDto).toList();
    }

    @PutMapping("/{id}/close")
    public TradeResponseDTO closeTrade(@PathVariable Integer id,
            @RequestBody @Valid TradeCloseRequestDTO closeRequest) {
        return tradeMapper.toDto(tradeService.closeTrade(id, closeRequest));
    }
}
