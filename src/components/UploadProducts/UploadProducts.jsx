import React from 'react';

const UploadProducts = () => {
    return (
        <div className="container">
            <h2>Subir Productos</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                    <input type="text" className="form-control" id="productName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="productPrice" />
                </div>
                <button type="submit" className="btn btn-primary">Subir Producto</button>
            </form>
        </div>
    );
};

export default UploadProducts;
