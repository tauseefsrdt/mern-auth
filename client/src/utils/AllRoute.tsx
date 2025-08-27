import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RootLayout from "../pages/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export const routes = [
    // Public routes
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <RootLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
           
        ],
    },


];
