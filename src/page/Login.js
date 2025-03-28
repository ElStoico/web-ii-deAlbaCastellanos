import '../style/login.css'
import MyInput from '../components/Form/MyInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthProtection } from './Auth';

export default function Login()
{
    useAuthProtection();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: user,
            password: password,
            expireInMins: 60
        }
        console.log("handleSubmit ~")
        fetLogIn(data, navigate);
        //console.log()
    }

    return (
        <div className="page-container">
            <div className="containerLogin">
                <h3>Login</h3>
                <form className="formLogin" onSubmit={handleSubmit}>
                    <div>
                        <input className='login-input' type="text" placeholder='User' name='user'  
                        onChange = {handleUserChange} />
                    </div>
                    <div>
                        <input className='login-input' type="password" placeholder='Password' name='password' 
                        onChange = {handlePasswordChange} />
                    </div>                  
                    <div className='login-button-container'>
                        <button className='login-button' type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    function fetLogIn(data, navigate){
        fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            const hasNoToken = response?.accessToken == undefined;

            if (hasNoToken){
                alert("Usuario o contraseña incorrectos");
                return;
            }
            alert("Bienvenido");
            localStorage.setItem("token", response.accessToken)
            navigate("/products")
        })
    }
}