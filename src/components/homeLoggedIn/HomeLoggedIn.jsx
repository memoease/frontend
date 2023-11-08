import React from "react";
import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import "./style.css";

const HomeLoggedIn = () => {
  return (
    <div>
      <h1 className="carousel_title">YOUR SETS</h1>
      <DiscoverCarousel />
      <h1 className="carousel_title">DISCOVER</h1>
      <DiscoverCarousel />
    </div>
  );
};
export default HomeLoggedIn;
