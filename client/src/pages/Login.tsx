import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loginUser } from "../redux/authThunks";
import store, { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate()
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
        <div className="w-full h-screen flex justify-center items-center">
            <form className="max-w-[450px] shadow-md rounded-2xl border border-gray-50 overflow-hidden" onSubmit={handleSubmit}>
                <h3 className="text-center text-xl font-semibold py-4 bg-amber-900 text-white">Login Page</h3>
                <div className="px-4 pb-2">
                    <input
                        className="w-full border px-4 py-1 mt-6 rounded-md border-gray-200"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="w-full border px-4 py-1 mt-6 rounded-md border-gray-200"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <div className="flex justify-center mt-6">
                        <button className="bg-amber-900 text-white px-6 py-1.5 cursor-pointer rounded-xl" type="submit" disabled={loading}>Login</button>
                    </div>
                    <span className="mt-6 flex justify-end text-gray-600 text-sm">If you are not register <Link className="text-amber-700 font-semibold ml-2" to="/register"> Register</Link></span>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {token && <p>✅ Logged in!</p>}
                </div>
            </form>
        </div>
    );
};

export default Login;
