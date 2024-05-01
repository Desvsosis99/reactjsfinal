import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { getDocs, collection, query, where, documentId, writeBatch, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const { cart, total, clearCart } = useContext(CartContext);
    const [buyer, setBuyer] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        phone: ''
    });

    const handleInputChange = (event) => {
        setBuyer({
            ...buyer,
            [event.target.name]: event.target.value
        });
    };

    const isFormValid = () => {
        return buyer.name && buyer.email && buyer.phone && buyer.email === buyer.confirmEmail;
    };

    const createOrder = async () => {
        if (!isFormValid()) {
            alert("Por favor, complete todos los campos y asegúrese de que los correos electrónicos coincidan.");
            return;
        }
        setLoading(true);
        const objOrder = {
            buyer,
            items: cart,
            total,
            date: Timestamp.fromDate(new Date())
        };

        try {
            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id);
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids));
            const querySnapshot = await getDocs(productsCollection);

            querySnapshot.docs.forEach(doc => {
                const data = doc.data();
                const stockDb = data.stock;
                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart ? productAddedToCart.quantity : 0;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...data });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();
                const orderCollection = collection(db, 'orders');
                const { id } = await addDoc(orderCollection, objOrder);
                
                clearCart();
                setOrderId(id);
            } else {
                alert('Hay productos que no tienen stock disponible');
            }
        } catch (error) {
            console.error('Hubo un error en la generación de la orden', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
                <h1 className="mt-3">Su orden está siendo generada...</h1>
            </div>
        );
    }
    
    if (orderId) {
        return (
            <div className="container mt-5 text-center">
                <h1>¡Gracias por su compra!</h1>
                <p className="lead">Su orden ha sido procesada exitosamente.</p>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Confirmación de Orden</h4>
                    El ID de su orden es: <strong>{orderId}</strong>
                </div>
                <div className="mt-4">
                    <button className="btn btn-primary btn-lg" onClick={() => window.location.href = '/'}>Continuar Comprando</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>Checkout</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Ingrese su nombre" value={buyer.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" value={buyer.email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmEmail" className="form-label">Confirmar Email</label>
                    <input type="email" className="form-control" id="confirmEmail" name="confirmEmail" placeholder="Confirme su email" value={buyer.confirmEmail} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input type="phone" className="form-control" id="phone" name="phone" placeholder="Ingrese su teléfono" value={buyer.phone} onChange={handleInputChange} />
                </div>
                <button className="btn btn-primary" onClick={createOrder} disabled={!isFormValid()}>Generar orden de compras</button>
            </form>
        </div>
    );
}

export default Checkout;
