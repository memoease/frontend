import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSetBySetId } from "../../utilities/service/api";
import ModalSetting from "../ModalSetting/ModalSetting";

const PublicLearnSession = () => {
  const { setId } = useParams();
  const [toLearn, setToLearn] = useState([]);
  const [isLearned, setIsLearned] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startSession = async () => {
      try {
        const session = await getSetBySetId(setId);
        setToLearn(session.toLearn);
        setIsLearned(session.isLearned);
        setCurrentCard(session.toLearn[index]);
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
      setToLearn(updatedToLearn);
      setIsLearned(updatedIsLearned);
      advanceToNextCard();
    }

    const advanceToNextCard = () => {
      const nextIndex = (index + 1) % toLearn.length;
      setIndex(nextIndex);
      setCurrentCard(toLearn[nextIndex]);
      setFlipped(true);

      if (nextIndex === 4) {
        setShowModal(true);
      }
    };

    const handleRegister = () => {
      sessionStorage.setItem("setId", setId);
      navigate("/register");
    };

    const handleLogin = () => {
      sessionStorage.setItem("setId", setId);
      navigate("/login");
    };

    return (
      <div className="public-learn-session">
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
                  ? `${toLearn.indexOf(currentCard) + 1} / ${toLearn.length}`
                  : ""}
              </div>
              <button
                className="ellipse-2"
                onClick={handleMoveToLearned}
              ></button>
            </div>
          </div>
        </div>
        <ModalSetting
          showModal={showModal}
          handleDeleteConfirms={handleRegister}
          handleDeleteCancels={handleLogin}
          modalText="If you would like to continue learning, you can simply register or log in"
          confirmButtonText="Register"
          cancelButtonText="Login"
        />
      </div>
    );
  };
};
export default PublicLearnSession;
