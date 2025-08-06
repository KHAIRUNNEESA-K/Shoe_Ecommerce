import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/Item';
import { Link } from 'react-router-dom';

export default function Popular() {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products?_limit=4')
      .then(res => res.json())
      .then(data => setPopularProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className='popular'>
      <div className='popular-header'>
        <p className='subtitle'>Trending Now</p>
        <h1 className='title'>Top Selling Products</h1>
        <p className='description'>
          Discover our most popular picks loved by our customers. Handpicked products with the best offers just for you.
        </p>
      </div>

      <div className='popular-items'>
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.newPrice}
            old_price={item.oldPrice}
            rating={item.rating}
          />
        ))}
      </div>

      <div className="button-wrapper">
        <Link to="/allcategory">
          <button className='view-all-btn'>View All Products</button>
        </Link>
      </div>
    </div>
  );
}
