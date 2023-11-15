import React from "react";
import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import "../../css/HomeLoggedIn.scss";

const HomeLoggedIn = () => {
  return (
    <div className="HomeLoggend_Contect">
      <h1 className="carousel_title">YOUR SETS</h1>
      <DiscoverCarousel />
      <h1 className="carousel_title">DISCOVER</h1>
      <DiscoverCarousel />
    </div>
  );
};
export default HomeLoggedIn;
