import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
