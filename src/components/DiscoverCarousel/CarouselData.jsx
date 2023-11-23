import React from "react";

const CarouselData = ({ item, id }) => {
  return (
    <div className="container">
      <div className="cards" key={id}>
        <div className="DiscoverCardsContent">
          <h1 className="title">{item.name}</h1>
          <button>{item.card}</button>
          <p className="discropt-created">{item.description}</p>
          <p>{item.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselData;
