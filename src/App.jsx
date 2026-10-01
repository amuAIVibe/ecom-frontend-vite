import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import Products from "./components/products/Products";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminProducts from "./components/admin/products/AdminProducts";
import Category from "./components/admin/categories/Category";
import Sellers from "./components/admin/sellers/Sellers";

function App() {

  return (
   <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/" element={<PrivateRoute/>}>
       <Route path="/checkout" element={<Checkout/>} />
       <Route path="/order-confirm" element={<PaymentConfirmation/>} />
      </Route>
      
      <Route path="/" element={<PrivateRoute publicPage/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Route>
      <Route path="/" element={<PrivateRoute adminOnly/>}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path='' element={<Dashboard/>} />
          <Route path='products' element={<AdminProducts/>} />
          <Route path='categories' element={<Category/>} />
          <Route path='sellers' element={<Sellers/>} />
        </Route>
      </Route>
    </Routes>
    <Toaster position="bottom-center"/>
   </BrowserRouter>
  );
}

export default App;
