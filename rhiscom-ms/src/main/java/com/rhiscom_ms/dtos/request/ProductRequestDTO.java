package com.rhiscom_ms.dtos.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {
    @NotBlank(message = "The product name cannot be empty or blank")
    private String name;
    @NotNull(message = "The price is mandatory.")
    @DecimalMin(value = "0.0", inclusive = false, message = "The price must be greater than 0")
    private BigDecimal price;
    @NotNull(message = "Stock is mandatory.")
    @Min(value = 0, message = "Stock cannot be negative.")
    private Integer stock;
}
