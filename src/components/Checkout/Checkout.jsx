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
        phone: ''
    });

    const handleInputChange = (event) => {
        setBuyer({
            ...buyer,
            [event.target.name]: event.target.value
        });
    };

    const isFormValid = () => buyer.name && buyer.email && buyer.phone;

    const createOrder = async () => {
        if (!isFormValid()) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        try {
            setLoading(true);
            const objOrder = {
                buyer,
                items: cart,
                total,
                date: Timestamp.fromDate(new Date())
            };
    
            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id);
    
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids));
    
            const querySnapshot = await getDocs(productsCollection);
            const { docs } = querySnapshot;
    
            docs.forEach(doc => {
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
                console.error('Hay productos que no tienen stock disponible');
            }
        } catch (error) {
            console.error('Hubo un error en la generación de la orden', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Su orden está siendo generada...</h1>;
    }

    if (orderId) {
        return <h1>El ID de su orden es: {orderId}</h1>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <input type="text" name="name" placeholder="Nombre" value={buyer.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={buyer.email} onChange={handleInputChange} />
            <input type="text" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleInputChange} />
            <button onClick={createOrder} disabled={!isFormValid()}>Generar orden de compras</button>
        </div>
    );
}

export default Checkout;
