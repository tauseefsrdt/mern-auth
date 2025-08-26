import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loginUser } from "../redux/authThunks";
import store, { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
     const navigate=useNavigate()
    const { loading, error, token } = useSelector((state: RootState) => state.auth);

    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        store.dispatch(loginUser(form));
    };
    useEffect(() => {
        if (token) {
            navigate("/"); 
        }
    }, [token, navigate]);
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit" disabled={loading}>Login</button>
            <span>Are you registe ? <Link to="/register"> Register</Link></span>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {token && <p>✅ Logged in!</p>}
        </form>
    );
};

export default Login;
