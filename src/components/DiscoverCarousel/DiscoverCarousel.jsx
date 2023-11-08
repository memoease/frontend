import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "./data.js";
import "../../css/discover.scss";
import CarouselItem from "./CarouselItem";

const DiscoverCarousel = () => {
  return (
    <div className="discover-content">
      <div className="DiscoverCarousel-container">
        <h2>Discover</h2>
        <CarouselItem data={data} />
      </div>
    </div>
  );
};

export default DiscoverCarousel;
