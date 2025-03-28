import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function isTokenValid() {
    return localStorage.getItem("token") !== null;
}

export function useAuthProtection() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isTokenValid()) {
            navigate("/login");
        }
    }, [navigate]);
}