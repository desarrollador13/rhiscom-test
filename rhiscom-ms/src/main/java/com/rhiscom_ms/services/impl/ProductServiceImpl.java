package com.rhiscom_ms.services.impl;

import com.rhiscom_ms.dtos.request.ProductRequestDTO;
import com.rhiscom_ms.dtos.request.ProductUpdateDTO;
import com.rhiscom_ms.dtos.responses.ProductResponseDTO;
import com.rhiscom_ms.entities.Product;
import com.rhiscom_ms.exceptions.ResourceNotFoundException;
import com.rhiscom_ms.mappers.ProductMapper;
import com.rhiscom_ms.repositories.ProductRepository;
import com.rhiscom_ms.services.IProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {

    ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductResponseDTO> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return productRepository.findAll(pageable)
            .stream()
            .map(ProductMapper::toDTO)
            .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO saveProduct(ProductRequestDTO dto) {

        Product product = ProductMapper.toEntity(dto);
        Product productSaved = productRepository.save(product);
        return ProductMapper.toDTO(productSaved);
    }

    @Override
    public void deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("The product with the id " + id + " is not found");
        }
        productRepository.deleteById(id);
    }

    @Override
    public ProductResponseDTO updateProduct(Integer id, ProductUpdateDTO dto) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("The product with the id " + id + " is not found");
        }
        dto.setId(id);
        Product product = ProductMapper.toEntityUpdate(dto);
        Product productUpdated = productRepository.save(product);
        return ProductMapper.toDTO(productUpdated);
    }
}
