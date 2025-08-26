import React, { useEffect, useState } from "react";
import API from "../api/Axios";
import LogoutButton from "../components/LogoutButton";

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        API.get("/auth/home")
            .then((res) => setMessage(res.data.message))
            .catch(() => setMessage("Unauthorized"));
    }, []);

    return (
        <div className="w-full h-[calc(100vh-75px)] flex justify-center items-center">
            <div className="w-full max-w-[400px] shadow-md rounded-2xl border border-gray-50 overflow-hidden p-5 flex flex-col items-center">
                <h2 className="text-3xl text-amber-800">{message}</h2>
                <div className="mt-6"> <LogoutButton />
                </div>
            </div>
        </div>
    );
};

export default Home;
