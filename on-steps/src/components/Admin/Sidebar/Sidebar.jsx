import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext'; 
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Orders
        </NavLink>
        
        
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
