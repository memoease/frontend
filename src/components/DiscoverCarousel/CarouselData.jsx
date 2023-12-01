import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utilities/hooks/useAuth";

const CarouselData = ({ item }) => {
  const navigate = useNavigate();
  const { authorized } = useAuth();

  const viewSet = (evt) => {
    const setId = evt.currentTarget.id;
    const path = authorized ? `/editset/${setId}` : `/publicsession/${setId}`;
    navigate(path);
  };

  return (
    <div className="container">
      <div className="cards">
        <div className="DiscoverCardsContent" id={item._id} onClick={viewSet}>
          <h1 className="title">{item.title}</h1>
          <button>{item.flashcards.length} Cards</button>
          <p className="discropt-created">{item.description}</p>
          <p>
            created by {item.createdBy ? item.createdBy.name : "Deleted User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarouselData;
