import ProductItem from "../components/ProductItem"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ProductList(){

    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [word, setWord] = useState(null);


    useEffect(() => {
        const fetchProducts = async() =>{
            const data = await getProducts();
            setProducts(data.products)
        }

        fetchProducts()
    },[])

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.length > 3;

        if (!hasWord) return;

        const fetchProductsByWord = async () => {
            try {
                const data = await getProductsByWord(word);
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products by word:", error);
            }
        };

        fetchProductsByWord();
    }, [word]);

    return(
        <div>
            <div style={{display: "flex", justifyContent:"center"}}>
                <input style={{padding: "15px", width: "90%", margin: "auto"}} onChange={(e) => setWord(e.target.value)} placeholder="Buscar productos..."/>
            </div>
            <div className="container products">
                {products && products.map((item) => {
                    return(
                        <ProductItem 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        images={item.images}
                        />
                    )
                })
                
                }            
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