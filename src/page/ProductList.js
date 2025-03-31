import ProductItem from "../components/ProductItem"
import Cart from "../components/Cart"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../style/products.css"

export default function ProductList(){

    const [products, setProducts] = useState(null);
    const [word, setWord] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    useEffect(() => {
        const fetchProducts = async() =>{
            setLoading(true);
            const data = await getProducts();
            setProducts(data.products);
            setNoResults(false);
            setLoading(false);
        }

        fetchProducts()
    },[])

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.length > 3;

        if (!hasWord) return;

        const fetchProductsByWord = async () => {
            setLoading(true);
            try {
                const data = await getProductsByWord(word);
                setProducts(data.products);
                setNoResults(data.products.length === 0);
            } catch (error) {
                console.error("Error fetching products by word:", error);
            }
            setLoading(false);
        };

        fetchProductsByWord();
    }, [word]);

    const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);

    return(
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    <input style={{padding: "15px", width: "90%"}} onChange={(e) => setWord(e.target.value)} placeholder="Buscar productos..."/>
                </div>
                <button onClick={() => setCartVisible(!cartVisible)} style={{ marginLeft: "20px" }}>🛒</button>
                {cartVisible && <Cart cartItems={cartItems} totalAmount={totalAmount} onClose={() => setCartVisible(false)} />}
            </div>
            <div className="container products">
                {loading && <p>Cargando...</p>}
                {noResults && <p>No se encontró ningún producto.</p>}
                {products && products.map((item) => {
                    return(
                        <ProductItem 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        images={item.images}
                        price={item.price}
                        />
                    )
                })}            
            </div>
        </div>
    )
}

async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    return response.json();
}

async function getProductsByWord(word) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${word}`);
    return response.json();
}