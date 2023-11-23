import React, { useEffect, useState } from "react";
import "../../css/EditSet.scss";
import AddCard from "./AddCard";
import ShowAndEditCards from "./ShowAndEditCard";
import FlipCards from "../FlipCards/FlipCards";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getSetBySetId } from "../../utilities/service/api";

const EditSet = () => {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [newCardAdded, setNewCardAdded] = useState(true);
  useEffect(() => {
    async function fetchSetData(setId) {
      try {
        const cardSet = await getSetBySetId(setId);
        setFlashcards(cardSet.flashcards)
        console.log(flashcards);
      } catch (error) {
        console.error(error);
      };
    };
    fetchSetData(setId);
  }, []);

  useEffect(() => {
    async function fetchSetData(setId) {
      try {
        const cardSet = await getSetBySetId(setId);
        setFlashcards(cardSet.flashcards)
        console.log(flashcards);
      } catch (error) {
        console.error(error);
      };
    };
    fetchSetData(setId);
  }, [newCardAdded]);


  const renderCards = () => {
    const entries = flashcards.map((card) => {
      return (
        <ShowAndEditCards
          question={card.question}
          answer={card.answer}
          cardId={card._id}
          setNewCardAdded={setNewCardAdded}
          newCardAdded={newCardAdded}
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
          <AddCard setId={setId} setNewCardAdded={setNewCardAdded} newCardAdded={newCardAdded} />
        </div>
      </div>
    </div>
  );
};

export default EditSet;
