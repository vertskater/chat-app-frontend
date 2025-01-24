import {Navigate, NavLink, Outlet} from "react-router-dom";
import '../styles/RootHome.css';

export default function RootHome() {
    const jwt = localStorage.getItem('jwt-token');
    return jwt ?
        <>
            <nav className="main-nav">
                <div className="logo">
                    <img src="/chatlogo.jpg" alt="Chat-Logo"/>
                </div>
                <ul>
                    <li>
                        {jwt ? (
                            <NavLink to={"/logout"} className="nav-link">Logout</NavLink>
                        ) : (
                            <NavLink to={"/login"} className="nav-link">Login</NavLink>
                        )}
                    </li>
                </ul>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </>
                :
                <Navigate to="/login"/>
                }