import React, { useEffect } from "react";

import { logoutUser } from "../redux/authThunks";
import store, { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const LogoutButton: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token, navigate])
    return <button className="bg-amber-900 text-white px-6 py-1.5 cursor-pointer rounded-xl" onClick={() => store.dispatch(logoutUser())}>Logout</button>;
};

export default LogoutButton;
