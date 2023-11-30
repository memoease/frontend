import React, { useEffect, useState } from "react";
import AddCard from "./AddCard";
import ShowAndEditCards from "./ShowAndEditCard";
import SetTitle from "./SetTitle";
import CardInfo from "./CardInfo";
import FlipCards from "../FlipCards/FlipCards";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { getSetBySetId } from "../../utilities/service/api";

const EditSet = () => {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState({});
  const [newCardAdded, setNewCardAdded] = useState(true);
  const [fetchDone, setFetchDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeCard, setActiveCard] = useState({});

  useEffect(() => {
    async function fetchSetData(setId) {
      try {
        const cardSet = await getSetBySetId(setId);
        if (cardSet && cardSet.flashcards && cardSet.flashcards.length > 0) {
          setFlashcards(cardSet);
          setActiveCard(cardSet.flashcards[index]);
          setFetchDone(true);
        } else {
          setFlashcards(cardSet);
          setFetchDone(true);
        }
      } catch (error) {
        console.error(error);
        console.log("error fetching set data", error.message);
      }
    }
    fetchSetData(setId);
  }, []);

  useEffect(() => {
    async function fetchSetData(setId) {
      try {
        const cardSet = await getSetBySetId(setId);
        if (cardSet && cardSet.flashcards && cardSet.flashcards.length > 0) {
          setFlashcards(cardSet);
          setActiveCard(cardSet.flashcards[index]);
          setFetchDone(true);
        } else {
          setFlashcards(cardSet);
          setFetchDone(true);
        }
      } catch (error) {
        console.error(error);
        console.log("error fetching set data", error.message);

      }
    }
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
    if (index <= flashcards.flashcards.length - 1) {
      const newIndex = (index + 1) % flashcards.flashcards.length;
      setIndex(newIndex);
      setActiveCard(flashcards?.flashcards[newIndex]);
    }
  };

  const clickLeft = () => {
    if (index > 0) {
      const newIndex = (index - 1) % flashcards.flashcards.length;
      setIndex(newIndex);
      setActiveCard(flashcards?.flashcards[newIndex]);
    }
  };



  if (!fetchDone) {
    return <h2>loading...</h2>;
  }

  return (
    <div className="EditSet_Container">
      <SetTitle title={flashcards.title} setNewCardAdded={setNewCardAdded}></SetTitle>
      <div className="EditSet_Content">
        <div className="div">
          <div className="edidtOverlap-group">
            <FlipCards
              activeCard={activeCard ? activeCard : ""}
              index={index}
            />
            <div className="editGroup">
              <button className="ellipseLeft" onClick={clickLeft}>
                <FiChevronLeft />
              </button>
              <div className="slidNumber">
                {index + 1}/{flashcards.flashcards.length}
              </div>
              <button className="ellipseRight" onClick={clickRight}>
                <FiChevronRight />
              </button>
            </div>
          </div>
          <div className="setPractice">
            <CardInfo setId={setId} description={flashcards.description} setNewCardAdded={setNewCardAdded} />
          </div>
        </div>
        <div className="FromEdit">
          {renderCards()}
          <AddCard
            setId={setId}
            setNewCardAdded={setNewCardAdded}
            newCardAdded={newCardAdded}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSet;
