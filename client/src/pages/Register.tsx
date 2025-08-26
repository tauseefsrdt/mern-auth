import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../redux/authThunks";
import store, { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const navigate = useNavigate()
    const { loading, error, success } = useSelector((state: RootState) => state.auth);

    const [form, setForm] = useState({ user: "", email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        store.dispatch(registerUser(form));
    };


    useEffect(() => {
        if (success) {
            navigate("/login");
        }
    }, [success, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
            />
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
            <button type="submit" disabled={loading}>Register</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default Register;
