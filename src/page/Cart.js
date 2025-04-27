import { useState, useEffect } from "react";
import "../style/cart.css";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const removeFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="item-info">
                                    <h3>{item.title}</h3>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio: ${item.price}</p>
                                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(index)}
                                    className="remove-button"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                        <button className="checkout-button">
                            Proceder al pago
                        </button>
                    </div>
                </>
            )}
        </div>
    );
} 