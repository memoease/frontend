import React, { useState } from "react";
import "../../css/EditSet.scss";
import AddCard from "./AddCard";
import ShowAndEditCards from "./ShowAndEditCard";
import FlipCards from "../FlipCards/FlipCards";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const EditSet = () => {
  const [fakeDB, setFakeDB] = useState([
    {
      _id: 1,
      question: "house",
      answer: "haus",
    },
    {
      _id: 2,
      question: "mouse",
      answer: "maus",
    },
  ]);
  const renderCards = () => {
    const entries = fakeDB.map((card) => {
      return (
        <ShowAndEditCards
          question={card.question}
          answer={card.answer}
          id={card._id}
        />
      );
    });
    return entries;
  };

  return (
    <div className="EditSet_Container">
      <h2>English</h2>
      <div className="EditSet_Content">
        <div className="div">
          <div className="edidtOverlap-group">
            <FlipCards />
            <div className="editGroup">
              <div className="ellipseLeft">
                <FiChevronLeft />
              </div>
              <div className="slidNumber">2/4</div>
              <div className="ellipseRight">
                <FiChevronRight />
              </div>
            </div>
          </div>
          <div className="setPractice">
            <div className="cardEdit">
              <h2 className="title">PRACTICE THIS SET</h2>
              <button>start</button>
            </div>
          </div>
        </div>
        <div className="FromEdit">
          {renderCards()}
          <AddCard setFakeDB={setFakeDB} fakeDB={fakeDB} />
        </div>
      </div>
    </div>
  );
};

export default EditSet;
