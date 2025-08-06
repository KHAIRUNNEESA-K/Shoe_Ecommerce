import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; 

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users');
    
        const allOrders = res.data.flatMap(user =>
          (user.order || []).map(order => ({
            ...order,
            userId: user.id,
            userName: user.name || 'Unknown',
            userPhone: user.phone || 'N/A',
          }))
        );
        setOrdersData(allOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="orders-loading">Loading orders...</div>;
  if (error) return <div className="orders-error">{error}</div>;

  if (ordersData.length === 0)
    return <div className="orders-empty">No orders found.</div>;

  return (
    <div className="orders-container">
      <h1 className='order-title'>All Orders</h1>
      {ordersData.map((order) => (
       <div key={order.id} className="order-card">
  <div className="order-header">
    <h3>Order ID: {order.id}</h3>
    <span className={`order-status ${order.status?.toLowerCase() || 'pending'}`}>
      {order.status || 'Pending'}
    </span>
  </div>

  <p><strong>User:</strong> {order.userName} ({order.userPhone})</p>
  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
  <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
  <p><strong>Delivery Address:</strong> {order.address}, Pin: {order.pincode}</p>

  <div className="order-items">
    <h4>Items:</h4>
    {(order.items && order.items.length > 0) ? (
      order.items.map((item) => (
        <div key={item.id} className="order-item">
          <img src={item.image} alt={item.name} className="order-item-image" />
          <div className="order-item-details">
            <p><strong>{item.name}</strong></p>
            <p>Size: {item.size}</p>
            <p>Qty: {item.quantity}</p>
            <p>Price: ₹{item.price * item.quantity}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No items found in this order.</p>
    )}
  </div>

  <hr className="order-divider" />
</div>

      ))}
    </div>
  );
};

export default Orders;
