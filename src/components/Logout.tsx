import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Logout() {

    const navigate = useNavigate();
    useEffect(() => {
        const logout = () => {
            localStorage.removeItem('jwt-token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
        }
        logout();
        navigate('/');
    }, [navigate]);
    return <p>... Logging out </p>
}