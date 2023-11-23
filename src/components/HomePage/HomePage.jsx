import React from "react";
import "../../css/homePage.scss";
import { NavLink } from "react-router-dom";
import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import homPageFoto from "../../assets/MemoBild.png";

const HomePage = () => {
  return (
    //    HomePage_container:
    <div className="HomePage_container">
      {/*   repper-content -------------- */}
      <div className="repper-content">
        <div className="content">
          <h1 className="title_head">Create and discover flashcard sets</h1>
          <div className="blockStart">
            <NavLink to="/" className="startLinkCardTitel">
              Get Started
            </NavLink>
          </div>
        </div>
        {/* get start link -------------- */}
        <div className="image-container">
          <img
            className="responsive-image"
            src={homPageFoto}
            alt="error message"
          />
        </div>
      </div>

      {/*  discover content ------------- */}
      <div className="carousel">
        <DiscoverCarousel />
      </div>
    </div>
  );
};

export default HomePage;
