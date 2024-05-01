import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useAsync } from "../../hooks/useAsync";
import { getProductById } from "../../services/firebase/firestore/products";

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const asyncFunction = () => getProductById(itemId);
    const { data: product, loading, error } = useAsync(asyncFunction, [itemId]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
                <h1 className="mt-3">Se está cargando el producto...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <h1>Hubo un error obteniendo el producto.</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title text-center">Detalle del Producto</h1>
                            <ItemDetail {...product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetailContainer;
