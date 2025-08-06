import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);

        const allOrders = users.flatMap(user =>
          (user.order || []).map(order => ({
            ...order,
            userName: user.name,
            userId: user.id, 
          }))
        );

        setOrders(allOrders);
      })
      .catch(console.error);

   
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const calculateRevenue = () => {
    let totalRevenue = 0;

    orders.forEach(order => {
      if (Array.isArray(order.items)) {
        order.items.forEach(item => {
          totalRevenue += (item.price || 0) * (item.quantity || 1);
        });
      }
    });

    return totalRevenue;
  };

  const revenue = calculateRevenue();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card card-users">
          <h2>Users</h2>
          <p>{users.length}</p>
        </div>

        <div className="card card-orders">
          <h2>Orders</h2>
          <p>{orders.length}</p>
        </div>

        <div className="card card-products">
          <h2>Products</h2>
          <p>{products.length}</p>
        </div>

        <div className="card card-revenue">
          <h2>Revenue</h2>
          <p>{formatCurrency(revenue)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
