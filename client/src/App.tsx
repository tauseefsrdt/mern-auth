import React from "react";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import { routes } from "./utils/AllRoute";
import { ToastContainer } from "react-toastify";



const App: React.FC = () => {
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       {/* Protected Home */}
  //       <Route
  //         path="/"
  //         element={
  //           <ProtectedRoute>
  //             <>
  //               <Header />
  //               <Home />
  //             </>
  //           </ProtectedRoute>
  //         }
  //       />

  //       {/* Public routes */}
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
};

export default App;
