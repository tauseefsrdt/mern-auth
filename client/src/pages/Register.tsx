import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../redux/authThunks";
import store, { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

        <div className="w-full h-screen flex justify-center items-center">
            <form className="max-w-[450px] shadow-md rounded-2xl border border-gray-50 overflow-hidden" onSubmit={handleSubmit}>
                <h3 className="text-center text-xl font-semibold py-4 bg-amber-900 text-white">Register Page</h3>
                <div className="px-4 pb-2">
                    <input
                        className="w-full border px-4 py-1 mt-6 rounded-md border-gray-200"
                        placeholder="Name"
                        value={form.user}
                        onChange={(e) => setForm({ ...form, user: e.target.value })}
                    />
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
                        <button className="bg-amber-900 text-white px-6 py-1.5 cursor-pointer rounded-xl" type="submit" disabled={loading}>Register</button>
                    </div>
                    <span className="mt-6 flex justify-end text-gray-600 text-sm">Are you all ready register ? <Link className="text-amber-700 font-semibold ml-2" to="/login"> Login </Link></span>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </form>

        </div>
    );
};

export default Register;
