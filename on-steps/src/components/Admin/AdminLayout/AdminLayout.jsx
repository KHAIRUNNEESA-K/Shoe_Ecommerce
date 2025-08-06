import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => (
  <div className="admin-layout">
      <Sidebar/>
      <Outlet/>

  </div>
);

export default AdminLayout;
