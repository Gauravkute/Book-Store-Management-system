import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import '../css/Home.css'

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-text">Book Shop</h1>
        <p className="hero-description">
          Browse the collection of our books and find your next read!
        </p>
      </div>
      <div className="hero-image">

      </div>
    </div>
  );
}   
export default Home;