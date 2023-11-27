import React from "react";
import { useNavigate } from "react-router-dom";

const CarouselData = ({ item }) => {
  const navigate = useNavigate();
  const viewSet = (evt) => {
    const setId = evt.currentTarget.id;
    navigate(`/editset/${setId}`);
  }

  return (
    <div className="container" key={item._id}>
      <div className="cards" >
        <div className="DiscoverCardsContent" id={item._id} onClick={viewSet}>
          <h1 className="title">{item.title}</h1>
          <button>{item.flashcards.length} Cards</button>
          <p className="discropt-created">{item.description}</p>
          <p>created by {item.createdBy.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselData;
