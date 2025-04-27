import { Routes, Route } from "react-router-dom"

import Home from '../page/Home'
import About from '../page/About'
import Contact from '../page/Contact'
import Login from "../page/Login"
import ProductList from '../page/ProductList'
import ProductDetails from "../page/ProductDetails"
import Product from '../page/Product'
import CreateProduct from '../page/CreateProduct'
import Cart from '../page/Cart'
import ReducerScreen from '../page/ReducerScreen'

export default function MyRouters()
{
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/product-details" element={<ProductDetails/>}/>
            <Route path="/product/:id" element={<Product />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/usereducer-component" element={<ReducerScreen />} />
        </Routes>
    )
}