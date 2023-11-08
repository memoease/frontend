import React from "react";

const CarouselData = ({ item, id }) => {
  return (
    <div>
      <div className="cards" key={id}>
        <div className="DiscoverCardsContent">
          <h3>{item.name}</h3>
          <button>{item.card}</button>
          <p className="discropt-created">{item.description}</p>
          <p>{item.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselData;
