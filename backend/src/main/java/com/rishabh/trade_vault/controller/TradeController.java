package com.rishabh.trade_vault.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rishabh.trade_vault.dto.TradeRequestDTO;
import com.rishabh.trade_vault.dto.TradeResponseDTO;
import com.rishabh.trade_vault.mapper.TradeMapper;
import com.rishabh.trade_vault.model.Trade;
import com.rishabh.trade_vault.service.TradeService;

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
    public TradeResponseDTO logTrade(@RequestBody TradeRequestDTO requestDTO) {
        Trade newTrade = tradeMapper.toEntity(requestDTO);
        Trade savedTrade = tradeService.logTrade(newTrade);

        return tradeMapper.toDto(savedTrade);
    }

    @GetMapping
    public List<TradeResponseDTO> getAllTrades() {
        List<Trade> allTrades = tradeService.getAllTrades();
        List<TradeResponseDTO> allTradeDtos = new ArrayList<>();

        for (Trade t : allTrades) {
            allTradeDtos.add(tradeMapper.toDto(t));
        }

        return allTradeDtos;
    }
}
