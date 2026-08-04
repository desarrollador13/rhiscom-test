package com.rhiscom_ms.mappers;

import com.rhiscom_ms.dtos.request.ProductRequestDTO;
import com.rhiscom_ms.dtos.request.ProductUpdateDTO;
import com.rhiscom_ms.dtos.responses.ProductResponseDTO;
import com.rhiscom_ms.entities.Product;

public class ProductMapper {

    public static ProductResponseDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }
        return ProductResponseDTO.builder()
            .id(product.getId())
            .name(product.getName())
            .price(product.getPrice())
            .stock(product.getStock())
            .build();
    }

    public static Product toEntity(ProductRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        return Product.builder()
            .name(dto.getName())
            .stock(dto.getStock())
            .price(dto.getPrice())
            .build();
    }

    public static Product toEntityUpdate(ProductUpdateDTO dto) {
        if (dto == null) {
            return null;
        }
        return Product.builder()
            .id(dto.getId())
            .name(dto.getName())
            .stock(dto.getStock())
            .price(dto.getPrice())
            .build();
    }
}
