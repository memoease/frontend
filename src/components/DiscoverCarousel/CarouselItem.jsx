import React from "react";
import Slider from "react-slick";
// react component for creating beautiful carousel
import "../../css/CarouselItem.scss";
import CarouselData from "./CarouselData";
const CarouselItem = ({ data }) => {
  const settings = {
    dots: true,
    infinite: data.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.map((item) => (
          <CarouselData item={item} key={item._id} />
        ))}
      </Slider>
    </div>
  );
};

export default CarouselItem;
