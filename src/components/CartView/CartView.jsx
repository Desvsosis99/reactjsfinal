import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartView = () => {
    const { cart, removeItem } = useContext(CartContext);

    return (
        <div className="container mt-3">
            <h1>Carrito de Compras</h1>
            {cart.length > 0 ? (
                <section>
                    {cart.map(prod => (
                        <article key={prod.id} className="d-flex align-items-center justify-content-between my-2">
                            <div className="me-auto p-2">
                                <h2>{prod.name} - {prod.quantity} x ${prod.price}</h2>
                            </div>
                            <div className="p-2">
                                <button className="btn btn-danger" onClick={() => removeItem(prod.id)}>Eliminar</button>
                            </div>
                        </article>
                    ))}
                    <div className="mt-3">
                        <Link to='/checkout' className="btn btn-primary">Ir a pagar</Link>
                    </div>
                </section>
            ) : (
                <p>Tu carrito está vacío.</p>
            )}
        </div>
    );
}

export default CartView;
