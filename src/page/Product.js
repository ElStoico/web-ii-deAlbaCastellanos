import {useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import Cart from "../components/Cart"; // Importar el componente de carrito
import "../style/producto_detalle.css"

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad
    const [message, setMessage] = useState(""); // Estado para mensajes
    const [cartVisible, setCartVisible] = useState(false); // Estado para mostrar el carrito
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Obtener productos del carrito

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            console.log("fetchProduct - data", data)
            setProduct(data)
        }

        fetchProduct()
    },[id])

    const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0); // Calcular el total

    const handleAddToCart = () => {
        if (quantity < 1 || quantity > product.stock) {
            setMessage("Cantidad no válida.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Si el producto ya existe, sumar la cantidad
            const existingProduct = cart[existingProductIndex];
            const newQuantity = existingProduct.quantity + quantity;

            if (newQuantity > product.stock) {
                setMessage("No puedes agregar más de lo que hay en existencia.");
                return;
            }

            existingProduct.quantity = newQuantity;
            cart[existingProductIndex] = existingProduct;
        } else {
            // Si el producto no existe, agregarlo al carrito
            if (cart.length >= 5) {
                setMessage("Solo puedes tener un máximo de 5 productos diferentes en el carrito.");
                return;
            }

            cart.push({ id: product.id, title: product.title, quantity, price: product.price });
        }

        const totalAmount = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
        if (totalAmount > 10000) {
            setMessage("El total del carrito no puede exceder $10,000.");
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems(cart); // Actualiza el estado del carrito
        setMessage("Producto agregado al carrito.");
    };

    return (
        <div className="product-page">
            <div className="cart-button-container" style={{ position: "relative" }}>
                <button onClick={() => setCartVisible(!cartVisible)}>🛒</button>
                {cartVisible && <Cart cartItems={cartItems} totalAmount={totalAmount} onClose={() => setCartVisible(false)} />}
            </div>
            {product && (
                <div className="product-container">
                    <div className="product-image-container">
                        <img src={product.images[0]} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-details-container">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p className="precio-p">Precio: ${product.price}</p>
                        <div className="quantity-container">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                max={product.stock}
                                className="quantity-input"
                            />
                            <button onClick={handleAddToCart} className="add-to-cart-button">AGREGAR AL CARRITO</button>
                        </div>
                        {message && <p className="message">{message}</p>}
                    </div>
                </div>
            )}
            
        </div>
    )
}

async function getProductById(id) {
    const product = fetch(`https://dummyjson.com/products/${id}`)
    return (await product).json();
}