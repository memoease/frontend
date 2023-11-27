import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/discover.scss";
import CarouselItem from "./CarouselItem";

const DiscoverCarousel = ({ data }) => {


  return (
    <div className="discover-content">
      <div className="DiscoverCarousel-container">
        <CarouselItem data={data} />
      </div>
    </div>
  );
};

export default DiscoverCarousel;
