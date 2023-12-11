import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import { useCards } from "../../utilities/hooks/useCards";
import { useAuth } from "../../utilities/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { publicCards, publicCardExcludeUser } = useCards();
  const { authorized } = useAuth();

  const viewPublicSet = (evt) => {
    const setId = evt.currentTarget.id;
    const path = authorized ? `/readset/${setId}` : `/publicsession/${setId}`;
    navigate(path);
  };


  const { groupId, setId } = useParams();

  useEffect(() => {
    // If groupId and setId are present in the URL, store them in localStorage
    if (groupId && setId) {
      localStorage.setItem("groupId", groupId);
      localStorage.setItem("setId", setId);
    }
  }, [groupId, setId]);

  return (
    //    HomePage_container:
    <div className="HomePageContainer">
      {/*   repper-content -------------- */}
      <div className="homePage_repper">
        <div className="Discriptcontent">
          <h1 className="title_head">Create And Discover flashcard sets</h1>

          {authorized ? (
            <NavLink to="/dashboard" className="startLinkCardTitel">
              Get Started
            </NavLink>
          ) : (
            <NavLink to="/register" className="startLinkCardTitel">
              Get Started
            </NavLink>
          )}
        </div>
        {/* get start link -------------- */}
        <div className="getStartlink-content">
          <div className="contentImage"></div>
        </div>
      </div>
      {/*  discover content ------------- */}
      <DiscoverCarousel data={authorized ? publicCardExcludeUser : publicCards} viewSet={viewPublicSet} />
    </div>
  );
};

export default HomePage;
