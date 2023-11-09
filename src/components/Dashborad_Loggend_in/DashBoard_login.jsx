import React from "react";
import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import "../../css/DashBoard_login.scss";
import { ImPlus } from "react-icons/im";
import { NavLink } from "react-router-dom";
const DashBoard_login = () => {
  return (
    <div>
      <div className="dashBorad_content">
        <div className="dashCarousel">
          <DiscoverCarousel />
        </div>
        <div className="dashborad_add_Content">
          <div className="title_dash">
            <p className="titleToAdd">
              Add a new flashcard set to your library{" "}
            </p>
          </div>
          <div className="dashboardAdd">
            <NavLink to="" className="dashPlus">
              <ImPlus className="plusLink" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard_login;
