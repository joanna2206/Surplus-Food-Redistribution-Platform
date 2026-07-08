import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Donor");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/users/register", {
                name,
                email,
                password,
                role
            });

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo">
                    🥗
                </div>

                <h1>Surplus Food Redistribution Platform</h1>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="Donor">Donor</option>
                        <option value="NGO">NGO</option>
                    </select>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Register
                    </button>

                </form>

                <div className="register-link">

                    <span>
                        Already have an account?
                    </span>

                    <br />

                    <Link to="/">
                        Login
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default Register;