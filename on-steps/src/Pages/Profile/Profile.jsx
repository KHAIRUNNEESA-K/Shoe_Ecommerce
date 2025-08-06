import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import './Profile.css';

export default function Profile() {
  const { user } = useContext(AuthContext); // 👈 Get user from context
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders(user.id);
    }
  }, [user]);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData = response.data;
      setOrders(userData.order || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <div className="profile-page">
      {user ? (
        <>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          <h3>Order History</h3>
          {orders.length === 0 ? (
            <p>No orders placed yet.</p>
          ) : (
            <div className="order-summary">
              {orders
                .slice()
                .reverse()
                .map((order) => (
                  <div key={order.id} className="order-box">
                    <h4>Order Date: {new Date(order.orderDate).toLocaleString()}</h4>
                    <div className="order-items">
                      {(order.items || []).map((item) => (
                        <div key={item.id} className="order-item">
                          <img src={item.image} alt={item.name} />
                          <p>{item.name}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Total Price: ₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                    <p>Total Amount: ₹{order.totalAmount}</p>
                    <p className={`status ${order.status?.toLowerCase() || 'active'}`}>
                      Status: {order.status || 'Active'}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
