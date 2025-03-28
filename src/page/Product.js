import {useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";

export default function Product() {
    const { id } = useParams();

    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async() => {
            const data = await getProductById(id);
            console.log("fetchProduct - data", data)
            setProduct(data)
        }

        fetchProduct()
    },[id])

    return(
        <div>
            {product && <ProductItem 
            title={product.title}
            id={product.id}
            description={product.description}
            images={product.images}
            />
            }
        </div>
    )
}

async function getProductById(id) {
    const product = fetch(`https://dummyjson.com/products/${id}`)
    return (await product).json();
}