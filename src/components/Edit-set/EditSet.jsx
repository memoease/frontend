import React, { useState } from "react";
import "../../css/EditSet.scss";
import SimpleSlider from "./EditSetSlider";
import AddCard from "./AddCard";
import ShowAndEditCards from "./ShowAndEditCard";


const EditSet = () => {
  const [fakeDB, setFakeDB] = useState(
    [
      {
        _id: 1,
        question: "house",
        answer: "haus"
      },
      {
        _id: 2,
        question: "mouse",
        answer: "maus"
      }
    ]
  )
  const renderCards = () => {
    const entries = fakeDB.map(card => {
      return <ShowAndEditCards question={card.question} answer={card.answer} id={card._id} />
    });
    return entries;
  }

  return (
    <div className="EditSet_Container">
      <h2>English</h2>
      {/* Radown (Arbeit Bereich) */}
      <div className="">
        <div className="slider">
          <SimpleSlider />
        </div>
      </div>
      {/* Imad (Arbeit Bereich) */}
      <div className="FromEdit">
        {renderCards()}
        <AddCard setFakeDB={setFakeDB} fakeDB={fakeDB} />
      </div>
    </div>
  );
};

export default EditSet;
