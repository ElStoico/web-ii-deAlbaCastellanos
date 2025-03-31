import React from 'react';

const Cart = ({ cartItems, totalAmount, onClose }) => {
    return (
        <div className="cart-modal">
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.title} - Cantidad: {item.quantity} - Precio: ${item.quantity * item.price}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalAmount}</h3>
                </div>
            )}
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
};

export default Cart;
