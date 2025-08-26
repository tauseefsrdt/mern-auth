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
        <div>
            <h2>{message}</h2>
            <LogoutButton />
        </div>
    );
};

export default Home;
