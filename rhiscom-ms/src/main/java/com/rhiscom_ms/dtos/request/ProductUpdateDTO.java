package com.rhiscom_ms.dtos.request;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductUpdateDTO {
    private Integer id;
    private String name;
    private BigDecimal price;
    private Integer stock;
}
