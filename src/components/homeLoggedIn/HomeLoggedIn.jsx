import React from "react";

import DiscoverCarousel from "../DiscoverCarousel/DiscoverCarousel";
import { useCards } from "../../utilities/hooks/useCards.jsx";

const HomeLoggedIn = () => {
  const { publicCards, privateCards } = useCards();

  return (
    <div className="HomeLoggend_Contect">
      <h1 className="carousel_title">YOUR SETS</h1>
      <DiscoverCarousel data={privateCards} />
      <h1 className="carousel_title">DISCOVER</h1>
      <DiscoverCarousel data={publicCards} />
    </div>
  );
};
export default HomeLoggedIn;
