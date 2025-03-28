import { Link, useLocation } from "react-router-dom";
import MyRouters from "../../router/Router";
import { useAuthProtection } from '../Auth';


export default function Menu(){
    useAuthProtection();
    const location = useLocation();
    const restricted = ["/login"];

    const notExists = restricted.indexOf(location.pathname) === -1;

    return (
        <div className="App">
            
            {(notExists && <header className="App-header"></header>)}

                <header className="App-header">
                    <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/about">About us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/product-details">Product Details</Link></li>
                    </ul>
                    </nav>
                
                </header>
                
                <MyRouters/>
        </div>
      );
}