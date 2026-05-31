package com.rishabh.trade_vault.mapper;

import org.mapstruct.Mapper;

import com.rishabh.trade_vault.dto.TradeRequestDTO;
import com.rishabh.trade_vault.dto.TradeResponseDTO;
import com.rishabh.trade_vault.model.Trade;

@Mapper(componentModel = "spring")
public interface TradeMapper {
    Trade toEntity(TradeRequestDTO tradeRequestDTO);

    TradeResponseDTO toDto(Trade trade);
}