import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-box">
      <h1>SHOPPING CART</h1>
      {cartItems.map((item) => (
        <div key={`${item.id}-${item.size}`} className="cart-product-box">
          <img src={item.image} alt={item.name} />
          <div className="details">
            <h3>{item.name}</h3>
            <p>Size: {item.size}</p>
            <div className="quantity-controls">
              <button
                onClick={() => {
                  const newQty = item.quantity - 1;
                  if (newQty >= 1) {
                    updateQuantity(item.id, item.size, newQty);
                  }
                }}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => {
                  updateQuantity(item.id, item.size, item.quantity + 1);
                }}
              >
                +
              </button>
            </div>
            <p>Price: ₹{item.price * item.quantity}</p>
            <div className="remove-button">
              <button onClick={() => removeFromCart(item.id, item.size)}>Remove Item</button>
            </div>
          </div>
        </div>
      ))}
      <div className="cart-footer">
        <h3>Total: ₹{calculateTotal()}</h3>
        <Link to="/PlaceOrder">
          <button className="checkout-button">CHECKOUT YOUR ORDER</button>
        </Link>
      </div>
    </div>
  );
}
