package com.rhiscom_ms.controllers;

import com.rhiscom_ms.dtos.request.ProductRequestDTO;
import com.rhiscom_ms.dtos.request.ProductUpdateDTO;
import com.rhiscom_ms.dtos.responses.PageResponseDTO;
import com.rhiscom_ms.dtos.responses.ProductResponseDTO;
import com.rhiscom_ms.services.IProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PageResponseDTO> getAllProducts(
        @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size
    ) {
       return ResponseEntity.ok().body(productService.getAllProducts(page, size));
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.saveProduct(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
        @PathVariable Integer id,  @RequestBody ProductUpdateDTO dto
    ) {
        return ResponseEntity.ok().body(productService.updateProduct(id, dto));
    }
}
