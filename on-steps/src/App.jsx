import { useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/User/Navbar/Navbar";
import Footer from "./components/User/Footer/Footer";

import Products from "./Pages/Products/products";
import Home from "./components/User/Home";
import LoginSignup from "./Pages/Login/Login";
import Cart from "./Pages/Cart/Cart";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Profile from "./Pages/Profile/Profile";


import AdminLayout from "./components/Admin/AdminLayout/AdminLayout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Users from "./components/Admin/Users/Users";
import Orders from "./components/Admin/Orders/Orders";
import ProductsAdmin from "./components/Admin/Products/Products";

import PrivateAdminRoute from "./PrivateAdminRoute";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function LayoutWrapper() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/signup"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User side layout */}
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/allcategory" element={<Products />} />
          <Route path="/men" element={<Products category="men" />} />
          <Route path="/women" element={<Products category="women" />} />
          <Route path="/kids" element={<Products category="kid" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
        </Route>

        {/* Admin routes protected */}
        <Route element={<PrivateAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
