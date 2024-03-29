import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicSetById } from "../../utilities/service/api";
import ModalSetting from "../ModalSetting/ModalSetting";
import FlipCards from "../FlipCards/FlipCards";

const PublicLearnSession = () => {
  const { setId } = useParams();
  const [toLearn, setToLearn] = useState([]);
  const [isLearned, setIsLearned] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cardAmount, setCardAmount] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const startSession = async () => {
      try {
        const session = await getPublicSetById(setId);

        const allFlashcards = session.flashcards;
        setCardAmount(allFlashcards.length);
        setToLearn(allFlashcards);
        setIsLearned([]);
        setCurrentCard(allFlashcards[index]);
      } catch (error) {
        console.error("Error in LearnSession useEffect:", error.response.data);
      }
    };

    startSession();
  }, [setId]);

  const handleMoveToLearned = () => {
    if (currentCard) {
      const updatedToLearn = toLearn.filter(
        (card) => card._id !== currentCard._id
      );
      const updatedIsLearned = [...isLearned, currentCard];

      setIsLearned(updatedIsLearned);
      setToLearn(updatedToLearn);
      setFlipped(!flipped);
      setTimeout(() => {
        setCurrentCard(updatedToLearn[index]);
      }, 200);
      if ((updatedToLearn.length - index) <= (cardAmount - 3)) {
        setShowModal(true);
      };
    };
  };

  const advanceToNextCard = () => {

    const nextIndex = (index + 1) % toLearn.length;
    setIndex(nextIndex);

    setFlipped(!flipped);
    setTimeout(() => {
      setCurrentCard(toLearn[nextIndex]);
    }, 200);

    if (nextIndex === 3 || toLearn.length <= 1 || (toLearn.length - nextIndex) <= cardAmount - 3) {
      setShowModal(true);
    }
  };

  const handleKeepInSession = () => {
    advanceToNextCard();
  };

  const handleRegister = () => {
    localStorage.setItem("setId", setId);
    navigate("/register");
  };

  const handleLogin = () => {
    localStorage.setItem("setId", setId);
    navigate("/login");
  };

  return (
    <div className="learn">
      {currentCard && toLearn && (
        <div className="div">
          <div className="overlap-group">
            <FlipCards activeCard={currentCard} index={flipped} />
            <div className="group">
              <button
                className="ellipse"
                onClick={handleKeepInSession}
              ></button>
              <div className="flipped-number">
                {toLearn
                  ? `${index + 1} / ${toLearn.length}`
                  : ""}
              </div>
              <button
                className="ellipse-2"
                onClick={handleMoveToLearned}
              ></button>
            </div>
          </div>
        </div>
      )}

      <ModalSetting
        showDeleteModal={showModal}
        handleDeleteConfirms={handleRegister}
        handleDeleteCancels={handleLogin}
        modalText="Would you like to continue learning?"
        confirmButtonText="Register"
        cancelButtonText="Login"
      />
    </div>
  );
};

export default PublicLearnSession;
