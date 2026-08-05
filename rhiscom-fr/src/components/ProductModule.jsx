import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const ProductModule = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Corregido: La paginación en Spring Boot inicia en 0 por defecto
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({ name: '', stock: '', price: '' });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        loadProducts(currentPage);
    }, [currentPage]);

    const loadProducts = async (page) => {
        try {
            setLoading(true);
            const validPage = Number.isNaN(Number(page)) ? 0 : Number(page);
            const response = await productService.getAll(validPage, itemsPerPage);
            
            setProducts(response.records || []);
            setTotalPages(response.totalPages || 1);
            setError(null);
        } catch (err) {
            setError('Error al conectar con el servidor REST.');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'El nombre es obligatorio.';
        if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) errors.stock = 'Stock inválido.';
        if (formData.price === '' || isNaN(formData.price) || Number(formData.price) <= 0) errors.price = 'Precio inválido.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const productPayload = {
                name: formData.name,
                stock: Number(formData.stock),
                price: Number(formData.price)
            };

            if (isEditing) {
                await productService.update(currentId, productPayload);
            } else {
                await productService.create(productPayload);
            }
            setShowModal(false);
            loadProducts(currentPage);
        } catch (err) {
            alert('Ocurrió un error al guardar el registro.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este registro?')) {
            try {
                await productService.remove(id);
                loadProducts(currentPage);
            } catch (err) {
                alert('No se pudo eliminar el registro.');
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando ...</div>;
    if (error) return <div className="alert alert-danger m-4">{error}</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm border-0 p-4 bg-white">
                
                <div className="d-flex justify-content-end mb-4">
                    <button className="btn btn-dark px-4" onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: '', stock: '', price: '' });
                        setFormErrors({});
                        setShowModal(true);
                    }}>
                        + Add
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-uppercase fs-7">
                            <tr>
                                <th className="py-3 ps-3">Nombre</th>
                                <th className="py-3">Stock</th>
                                <th className="py-3">Precio</th>
                                <th className="py-3 text-end pe-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="ps-3 fw-bold text-dark">{product.name}</td>
                                        <td>
                                            <span className="badge bg-secondary">{product.stock} unids</span>
                                        </td>
                                        <td className="fw-semibold text-success">
                                            ${Number(product.price).toLocaleString()}
                                        </td>
                                        <td className="text-end pe-3">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button 
                                                    className="btn btn-outline-secondary btn-sm px-3" 
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setCurrentId(product.id);
                                                        setFormData({ name: product.name, stock: product.stock, price: product.price });
                                                        setFormErrors({});
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    className="btn btn-outline-danger btn-sm px-3" 
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">
                                        No hay productos registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginador inferior ajustado al índice base 0 */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                        <small className="text-muted">Página {currentPage + 1} de {totalPages}</small>
                        <div className="btn-group btn-group-sm">
                            <button 
                                className="btn btn-outline-dark" 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0}
                            >
                                Anterior
                            </button>
                            <button 
                                className="btn btn-outline-dark" 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                                disabled={currentPage >= totalPages - 1}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">{isEditing ? 'Actualizar Producto' : 'Nuevo Producto'}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Nombre</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Stock</label>
                                        <input 
                                            type="number" 
                                            className={`form-control ${formErrors.stock ? 'is-invalid' : ''}`}
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        />
                                        {formErrors.stock && <div className="invalid-feedback">{formErrors.stock}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Precio</label>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                        {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
                                    </div>
                                </div>
                                <div className="modal-footer bg-light">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-dark">{isEditing ? 'Actualizar' : 'Guardar'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};