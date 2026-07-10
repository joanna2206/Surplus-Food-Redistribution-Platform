import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useEffect } from "react";
import socket from "../socket";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {

    if (user) {

        socket.connect();

        socket.emit("join", {

            userId: user._id,

            role: user.role

        });

    }

    return () => {

        socket.disconnect();

    };

}, []);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                Surplus Food Redistribution Platform

            </div>

            <div className="nav-right">

                <span className="username">

                     {user?.name}

                </span>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;