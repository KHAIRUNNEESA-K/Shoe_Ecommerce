import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { addToCart, cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      setError("⚠️ Please select a size before adding to cart.");
      return;
    }

    setError("");
    setMessage("");

    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      setMessage("🛒 This item is already in your cart.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.newPrice,
      size: selectedSize,
      quantity: 1,
    };

    addToCart(cartItem);
    setMessage("✅ Item added to cart.");

    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="product-details">
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details-info">
        <h2 className="product-brand">{product.name}</h2>
        <p className="product-subname">{product.subname}</p>
        <div className="product-rating">
          <span className="rating-value">{product.rating}</span>
          <span className="rating-count">{product.ratingCount}</span>
        </div>
        <hr />
        <hr />
        <div className="product-price">
          <span className="new-price">₹{product.newPrice}</span>
          <span className="old-price">
            MRP ₹<s>{product.oldPrice}</s>
          </span>
          <span className="offer">({product.offer})</span>
        </div>
        <div className="tax-note">inclusive of all taxes</div>
        <div className="product-size-section">
          <div className="size-title">SELECT SIZE (UK Size)</div>
          <div className="size-options">
            {["6", "7", "8", "9", "10"].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {error && <p style={{ color: "red", fontWeight: "500" }}>{error}</p>}
        {message && <p style={{ color: "green", fontWeight: "500" }}>{message}</p>}
        <div className="action-buttons">
          <button
            type="button"
            className="add-to-bag-btn"
            onClick={handleAddToCart}
          >
            🛍️ ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
