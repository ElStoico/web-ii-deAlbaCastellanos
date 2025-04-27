import { useState, useEffect, useReducer, act } from "react";
import "../style/create_product.css";
import CreateProductActions from "../functions/CreateProductActions";
import { useFormStatus } from "react-dom";

async function ProductAction(state, action){
    if (action.type === "POST"){
        const {title, description, category, price} = action.payload
        const data={
            ...action.payload
        }
        const response = await CreateProductActions(data)
        return {
            title: response.title,
            description: response.description,
            category: response.category,
            price: response.price
        }
    }
    if (action.type === "PATCH"){
        const {id, ...rest} = action.payload;
        const data = {
            ...rest
        }
        console.log("~ ProductAction ~: ",data)
        return state;
    }
    return state;
}

export default function CreateProduct() {

    const [categories, setCategories] = useState([])
    const [state, dispatch] = useReducer(ProductAction, {
        title: "",
        description: "",
        category: "",
        price: 0
    })

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("https://dummyjson.com/products/categories")
            const data = await response.json()
            setCategories(data)
        }

        fetchCategories()
    }, [])

    async function submitAction(formData){
        const {title, description, category, price} = Object.fromEntries(formData)
        dispatch({ type: "POST", payload: {title, description, category, price}})
        return;
    }

    return (
        <div className="create-product-container">
            <h2>Crear Nuevo Producto</h2>
            <form action={submitAction} className="create-product-form">
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Ingrese el título"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Ingrese la descripción"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Ingrese el precio"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <select id="category" name="category">
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="Center-in-div">
                    <button onClick={() => dispatch({ type: "CREATE_PRODUCT"}) }>
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}



function ButtonSave() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="submit-button">
            {pending ? "Saving..." : "Save"}
        </button>
    )
}