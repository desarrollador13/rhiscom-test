import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const productService = {
    getAll: async (page, size) => {
        const validPage = Number.isNaN(Number(page)) ? 0 : Number(page);
        const validSize = Number.isNaN(Number(size)) ? 5 : Number(size);
        const response = await axios.get(API_URL, {
            params: { 
                page: validPage, 
                size: validSize 
            }
        });
        return response.data;
    },

    create: async (productData) => {
        const response = await axios.post(API_URL, productData);
        return response.data;
    },

    update: async (id, productData) => {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data;
    },

    remove: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
};