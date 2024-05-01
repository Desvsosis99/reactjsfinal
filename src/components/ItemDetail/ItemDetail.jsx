import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useNotification } from '../../notification/hooks/useNotification';

const InputCount = ({ onAdd, stock, initial= 1 }) => {
    const [count, setCount] = useState(initial);

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue >= 1 && newValue <= stock) {
            setCount(newValue);
        }
    };

    return (
        <div className="input-group mb-3">
            <input type='number' className="form-control" onChange={handleChange} value={count} />
            <div className="input-group-append">
                <button className="btn btn-outline-primary" onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
        </div>
    );
};

const ButtonCount = ({ onAdd, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if(count < stock) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="btn-group mb-3" role="toolbar" aria-label="Toolbar with button groups">
            <button className="btn btn-secondary" onClick={decrement}>-</button>
            <div className="btn-group mx-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-outline-secondary disabled">{count}</button>
            </div>
            <button className="btn btn-secondary" onClick={increment}>+</button>
            <button className="btn btn-primary" onClick={() => onAdd(count)}>Agregar al carrito</button>
        </div>
    );
};

const ItemDetail = ({ id, name, category, imageUrl, price, stock, description }) => {
    const [inputType, setInputType] = useState('button');
    const ItemCount = inputType === 'input' ? InputCount : ButtonCount;
    const { addItem, isInCart } = useContext(CartContext);
    const { showNotification } = useNotification();

    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        };
        console.log(objProductToAdd);
        showNotification('success', `Se agregó correctamente ${quantity} ${name}`);
        addItem(objProductToAdd);
    };

    return (
        <article className="card">
            <div className="card-header">
                <button className="btn btn-outline-info" onClick={() => setInputType(inputType === 'input' ? 'button' : 'input')}>
                    Cambiar contador
                </button>
            </div>
            <img src={imageUrl} className="card-img-top" alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="card-text">Categoria: {category}</p>
                <p className="card-text">Descripción: {description}</p>
                <p className="card-text">Precio: ${price}</p>
            </div>
            <div className="card-footer">
                {
                    !isInCart(id) ? (
                        <ItemCount onAdd={handleOnAdd} stock={stock}/>
                    ) : (
                        <Link to='/cart' className="btn btn-success">Finalizar compra</Link>
                    )
                }
            </div>
        </article>
    );
};

export default ItemDetail;
