import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import Logo from "../../../assets/Logo.png";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../Context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("all");
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };


  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="logo image" />
          </Link>
          <p>ON-STEPS</p>
        </div>

        <div className="nav-login-cart">
          {user ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/profile">
                <MdAccountCircle size={25} />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}

          <Link to="/cart" className="cart-icon-wrapper">
            <BsCart4 size={24} />
            <span className="cart-count">{user ? getCartCount() : 0}</span>
          </Link>
        </div>
      </div>

      <div className="navbar-menu">
        <ul className="nav-menu">
          <li
            className={activeMenu === "all" ? "active" : ""}
            onClick={() => handleMenuClick("all")}
          >
            <Link to="/allcategory">All</Link>
          </li>
          <li
            className={activeMenu === "men" ? "active" : ""}
            onClick={() => handleMenuClick("men")}
          >
            <Link to="/men">Men</Link>
          </li>
          <li
            className={activeMenu === "women" ? "active" : ""}
            onClick={() => handleMenuClick("women")}
          >
            <Link to="/women">Women</Link>
          </li>
          <li
            className={activeMenu === "kids" ? "active" : ""}
            onClick={() => handleMenuClick("kids")}
          >
            <Link to="/kids">Kids</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
