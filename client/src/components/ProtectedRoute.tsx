import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // Example: check token from localStorage (you can also use Redux or Context)
    const isAuthenticated = !!localStorage.getItem("token");
    console.log("isAuthenticated", isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
