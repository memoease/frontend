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
  const [flashcards, setFlashcards] = useState({});
  const [newCardAdded, setNewCardAdded] = useState(true);
  const [fetchDone, setFetchDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeCard, setActiveCard] = useState({});

  console.log(index);

  useEffect(() => {
    async function fetchSetData(setId) {
      try {
        const cardSet = await getSetBySetId(setId);
        if (cardSet && cardSet.flashcards && cardSet.flashcards.length > 0) {
          setFlashcards(cardSet);
          setActiveCard(cardSet.flashcards[index]);
          setFetchDone(true);
        }
      } catch (error) {
        console.error(error);
        console.log("error")
      };
    };
    fetchSetData(setId);
  }, []);

  useEffect(() => {
    async function fetchSetData(setId) {
      try {
        const cardSet = await getSetBySetId(setId);
        setFlashcards(cardSet)
      } catch (error) {
        console.error(error);
      };
    };
    fetchSetData(setId);
  }, [newCardAdded]);

  const renderCards = () => {
    const cards = flashcards.flashcards;
    const entries = cards?.map((card) => {
      return (
        <ShowAndEditCards
          question={card.question}
          answer={card.answer}
          key={card._id}
          setNewCardAdded={setNewCardAdded}
          newCardAdded={newCardAdded}
          cardId={card._id}
        />
      );
    });
    return entries;
  };

  const clickRight = () => {
    if (index < flashcards.flashcards.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setActiveCard(flashcards?.flashcards[newIndex]);
      console.log(index);
    }
  };

  const clickLeft = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setActiveCard(flashcards?.flashcards[newIndex]);
      console.log(index);
    };
  };

  if (!fetchDone) {
    return <h2>loading...</h2>;
  }


  return (
    <div className="EditSet_Container">
      <h2>{flashcards.title}</h2>
      <div className="EditSet_Content">
        <div className="div">
          <div className="edidtOverlap-group">
            <FlipCards activeCard={activeCard} index={index} />
            <div className="editGroup">
              <div className="ellipseLeft">
                <FiChevronLeft onClick={clickLeft} />
              </div>
              <div className="slidNumber">{index + 1}/{flashcards.flashcards.length}</div>
              <div className="ellipseRight">
                <FiChevronRight onClick={clickRight} />
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
