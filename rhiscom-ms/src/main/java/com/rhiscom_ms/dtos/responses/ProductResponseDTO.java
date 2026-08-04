package com.rhiscom_ms.dtos.responses;


import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class ProductResponseDTO {

    private int id;
    private String name;
    private BigDecimal price;
    private Integer stock;

}
