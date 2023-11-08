import React from "react";
import "../../css/homePage.scss";
import { NavLink } from "react-router-dom";
import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";

const HomePage = () => {
  return (
    //    HomePage_container:
    <div className="HomePage_container">
      {/*   repper-content -------------- */}
      <div className="repper-content">
        <div className="content">
          <h1>Create And Discover flashcard sets</h1>
          <p className="create-and-extend">
            create and extend your own flashcard sets in your dashboard, decide
            if they are private or public and start learning
          </p>
        </div>
        {/* get start link -------------- */}
        <div className="getStartlink-content">
          <div className="startCrad">
            <div className="blockStart">
              <NavLink to="/" className="startLinkCard">
                Get Started
              </NavLink>
            </div>
            <NavLink to="/" className="singinLinkCard">
              Or Sing In
            </NavLink>
          </div>
        </div>
      </div>
      {/*  discover content ------------- */}
      <DiscoverCarousel />
    </div>
  );
};

export default HomePage;
