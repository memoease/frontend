import React from "react";

const CarouselData = ({ item, viewSet }) => {

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
