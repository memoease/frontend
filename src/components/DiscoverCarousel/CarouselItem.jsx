import React from "react";
import Slider from "react-slick";
import { ImPlus } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
// react component for creating beautiful carousel
import CarouselData from "./CarouselData";
const CarouselItem = ({ data, viewSet }) => {
  const settings = {
    dots: true,
    infinite: data?.length > 3,
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
      {data?.length === 0 ? (
        <Slider {...settings}>
          <div className="container">
            <div className="cards">
              <div className="add-cards-container">
                <NavLink to="/create" className="dashPlus">
                  <ImPlus className="plusLink" />
                </NavLink>
              </div>
            </div>
          </div>
        </Slider>
      ) : (
        <Slider {...settings}>
          {data?.map((item) => (
            <CarouselData item={item} key={item._id} viewSet={viewSet} />
          ))}
        </Slider>
      )
      }

    </div >
  );
};

export default CarouselItem;
