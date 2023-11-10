import React, { Component } from "react";
import Slider from "react-slick";
import FlipCardExample from "../FlipCards/FlipCards";

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
            <FlipCardExample />
          </div>
          <div>
            <FlipCardExample />
          </div>
          <div>
            <FlipCardExample />
          </div>
          <div>
            <FlipCardExample />
          </div>
        </Slider>
      </div>
    );
  }
}
