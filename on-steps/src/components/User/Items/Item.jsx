import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

export default function Item({ id, name, image, color}) {
  return (
        <Link to={`/product/${id}`} className="item-link">
    <div className='product-card'>
      <img src={image} alt={name} className='product-img' />
      <h3 className='product-name'>{name}</h3>
      <p className='product-color'>{color}</p>
  


      
    </div>
    </Link>
  );
}
