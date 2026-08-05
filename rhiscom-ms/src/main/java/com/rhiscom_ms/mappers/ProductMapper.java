package com.rhiscom_ms.mappers;

import com.rhiscom_ms.dtos.request.ProductRequestDTO;
import com.rhiscom_ms.dtos.request.ProductUpdateDTO;
import com.rhiscom_ms.dtos.responses.PageResponseDTO;
import com.rhiscom_ms.dtos.responses.ProductResponseDTO;
import com.rhiscom_ms.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public static ProductResponseDTO toDTO(Product product) {

        return ProductResponseDTO.builder()
            .id(product.getId())
            .name(product.getName())
            .price(product.getPrice())
            .stock(product.getStock())
            .build();
    }

    public static Product toEntity(ProductRequestDTO dto) {
        return Product.builder()
            .name(dto.getName())
            .stock(dto.getStock())
            .price(dto.getPrice())
            .build();
    }

    public static Product toEntityUpdate(ProductUpdateDTO dto) {
        return Product.builder()
            .id(dto.getId())
            .name(dto.getName())
            .stock(dto.getStock())
            .price(dto.getPrice())
            .build();
    }
    public static PageResponseDTO<ProductResponseDTO> toPageResponseDTO(Page<Product> pageResult) {
        List<ProductResponseDTO> dtos = pageResult.getContent().stream()
            .map(ProductMapper::toDTO)
            .collect(Collectors.toList());

        return PageResponseDTO.<ProductResponseDTO>builder()
            .records(dtos)
            .pages(pageResult.getTotalPages())
            .count(pageResult.getTotalElements())
            .totalPages(pageResult.getTotalPages())
            .isLast(pageResult.isLast())
            .build();
    }
}
