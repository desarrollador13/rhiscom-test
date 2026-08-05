package com.rhiscom_ms.services;

import com.rhiscom_ms.dtos.request.ProductRequestDTO;
import com.rhiscom_ms.dtos.request.ProductUpdateDTO;
import com.rhiscom_ms.dtos.responses.PageResponseDTO;
import com.rhiscom_ms.dtos.responses.ProductResponseDTO;

public interface IProductService {

    PageResponseDTO getAllProducts(int page, int size);
    ProductResponseDTO saveProduct(ProductRequestDTO dto);
    void deleteProduct(Integer id);
    ProductResponseDTO updateProduct(Integer id, ProductUpdateDTO dto);

}
