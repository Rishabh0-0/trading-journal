package com.rishabh.trade_vault;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class TradeVaultApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradeVaultApplication.class, args);
	}

}
