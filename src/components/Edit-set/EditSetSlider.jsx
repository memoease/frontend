import React, { Component } from "react";
import Slider from "react-slick";
import FlipCards from "../FlipCards/FlipCards";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <FlipCards />
          </div>
        </Slider>
      </div>
    );
  }
}
