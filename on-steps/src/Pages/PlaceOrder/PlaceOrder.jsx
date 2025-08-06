import React, { useContext, useState, useCallback } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import './PlaceOrder.css';

const PlaceOrder = React.memo(() => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);  // Added setUser here
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleConfirmOrder = useCallback(async () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Please enter your name';
    if (!phone.trim()) errors.phone = 'Please enter your mobile number';
    if (!pincode.trim()) errors.pincode = 'Please enter your pin code';
    if (!address.trim()) errors.address = 'Please enter your address';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const newOrder = {
      id: Date.now(),
      name,
      phone,
      pincode,
      address,
      items: cartItems,
      totalAmount: totalPrice,
      orderDate: new Date().toISOString(),
    };

    try {
      if (!user?.id) {
        alert('User ID is missing!');
        return;
      }

      const userResponse = await axios.get(`http://localhost:3000/users/${user.id}`);
      const currentOrders = userResponse.data.order || [];
      const updatedOrders = [...currentOrders, newOrder];

      const response = await axios.patch(`http://localhost:3000/users/${user.id}`, {
        order: updatedOrders,
        cart: [],
      });

      if (response.status === 200) {
        alert('Order Placed Successfully!');
        setCartItems([]);
        setName('');
        setPhone('');
        setPincode('');
        setAddress('');
        setFormErrors({});

       
        const updatedUser = {
          ...user,
          order: updatedOrders,
          cart: [],
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        navigate('/profile');
      } else {
        alert('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
      alert('Failed to place the order. Please try again.');
    }
  }, [cartItems, name, phone, pincode, address, totalPrice, user, setCartItems, setUser, navigate]);

  if (cartItems.length === 0) {
    return (
      <div className="order-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/cart')}>Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="place-order-container">
      <h1 className='place-title'>Place Your Order</h1>

      <div className="order-content">
        <div className="cart-items">
          <h3>Cart Items</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <hr className="divider" />
          <div className="cart-total-box">
            <h3>Total Amount: ₹{totalPrice}</h3>
          </div>
        </div>

        <div className="order-form">
          <h3>Delivery Details</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && <p className="error">{formErrors.name}</p>}

            <input
              type="text"
              placeholder="Mobile Number*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {formErrors.phone && <p className="error">{formErrors.phone}</p>}

            <input
              type="text"
              placeholder="Pin Code*"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            {formErrors.pincode && <p className="error">{formErrors.pincode}</p>}

            <input
              type="text"
              placeholder="Full Address*"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {formErrors.address && <p className="error">{formErrors.address}</p>}
          </form>
        </div>
      </div>

      <div className="order-buttons">
        <button onClick={() => navigate('/cart')}>Back to Cart</button>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
});

export default PlaceOrder;
