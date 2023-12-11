import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CarouselItem from "./CarouselItem";

const DiscoverCarousel = ({ data, viewSet }) => {
  return (
    <div className="discover-content">
      <div className="DiscoverCarousel-container">
        <CarouselItem data={data} viewSet={viewSet} />
      </div>
    </div>
  );
};

export default DiscoverCarousel;
