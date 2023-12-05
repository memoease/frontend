import React from "react";

import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import { useCards } from "../../utilities/hooks/useCards.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";

const HomeLoggedIn = () => {
  const navigate = useNavigate();
  const { authorized } = useAuth();

  const { publicCards, privateCards } = useCards();

  const viewPublicSet = (evt) => {
    const setId = evt.currentTarget.id;
    const path = authorized ? `/readset/${setId}` : `/publicsession/${setId}`;
    navigate(path);
  };

  const viewPrivateSet = (evt) => {
    const setId = evt.currentTarget.id;
    navigate(`/editset/${setId}`);
  };

  return (
    <div className="HomeLoggend_Contect">
      <h1 className="carousel_title">YOUR SETS</h1>
      <DiscoverCarousel data={privateCards} viewSet={viewPrivateSet} />
      <h1 className="carousel_title">DISCOVER</h1>
      <DiscoverCarousel data={publicCards} viewSet={viewPublicSet} />
    </div>
  );
};
export default HomeLoggedIn;
