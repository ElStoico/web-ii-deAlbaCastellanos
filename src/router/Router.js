import { Routes, Route } from "react-router-dom"

import Home from '../page/Home'
import About from '../page/About'
import Contact from '../page/Contact'
import Login from "../page/Login"
import ProductList from '../page/ProductList'
import ProductDetails from "../page/ProductDetails"
import Product from '../page/Product'


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
        </Routes>
    )
}