import React from 'react';
import './Hero.css';
import ShoeImage from "../../../assets/ShoeImage2.jpg"; 
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-container full-width-style">
      <div className="hero-image-background">
        <img src={ShoeImage} alt="Cloudknit Sneakers" className="hero-background-image" />
      </div>
      <div className="hero-overlay">
        <div className="hero-text-content">
          <h2 className="hero-introducing">INTRODUCING</h2>
          <h1 className="hero-title">THE CLOUDKNIT</h1>
          <h1 className="hero-title sneakers">SNEAKERS</h1>
          <p className="hero-subtitle">MAX OUT. ON COMFORT.</p>
          <Link to ="/allcategory">
          <button className="try-now-button orange">TRY NOW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;