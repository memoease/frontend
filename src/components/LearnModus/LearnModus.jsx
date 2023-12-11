import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlipCards from "../FlipCards/FlipCards";
import LoadingBar from "../Progressbar/ProgressBar";

import {
  startLearnSession,
  updateSessionCardToLearned,
  refreshLearnSession,
} from "../../utilities/service/api";
import { useSnackbar } from "@mui/base";

export const LearnModus = () => {
  const [sessionData, setSessionData] = useState(null);
  const [currentCard, setCurrentCard] = useState(null); // Current card being considered
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(true);
  const { setId } = useParams(); // Extracting setId from route params
  const navigate = useNavigate();

  const allCardsLearned = sessionData?.toLearn.length === 0 && !currentCard;

  useEffect(() => {
    const startSession = async () => {
      try {
        // Start Learn Session
        const session = await startLearnSession(setId);
        setSessionData(session);

        // Set the initial current card
        if (session.toLearn && session.toLearn.length > 0) {
          setCurrentCard(session.toLearn[index]);
        }
      } catch (error) {
        console.error("Error in LearnSession useEffect:", error.response.data);
      }
    };

    startSession();
  }, [setId]); // Include setId in the dependency array so that the effect re-runs when it changes

  const handleMoveToLearned = async () => {
    if (sessionData && currentCard) {
      const cardIdToUpdate = currentCard._id;
      const updatedSession = await updateCardToLearned(cardIdToUpdate);
      if (index === updatedSession.toLearn.length) {
        const newIndex = 0;
        setIndex(newIndex);
        setFlipped(!flipped);
        setTimeout(() => {
          setCurrentCard(updatedSession.toLearn[newIndex]);
        }, 200);
        console.log("curretncard: ", currentCard);
      } else {
        setFlipped(!flipped);
        setTimeout(() => {
          setCurrentCard(updatedSession.toLearn[index]);
        }, 200);
      }
    }
  };

  const handleKeepInSession = () => {
    // Advance to the next card without updating the current card
    setFlipped(!flipped);

    // Find the index of the current card
    const currentIndex = sessionData.toLearn.indexOf(currentCard);

    // Increment the index and handle boundary conditions
    const nextIndex = (currentIndex + 1) % sessionData.toLearn.length;
    setIndex(nextIndex);
    setTimeout(() => {
      setCurrentCard(sessionData.toLearn[nextIndex]);
    }, 200);
  };

  const handleRefreshSession = async () => {
    // Refresh the Learn Session
    if (sessionData && sessionData._id) {
      const updatedSession = await refreshLearnSession(sessionData._id);
      setSessionData(updatedSession);

      // Set the initial current card after refresh
      if (updatedSession.toLearn && updatedSession.toLearn.length > 0) {
        setCurrentCard(updatedSession.toLearn[0]);
        setIndex(0);
      }
    }
  };

  const updateCardToLearned = async (cardId) => {
    try {
      // Update Card to Learned
      const updatedSession = await updateSessionCardToLearned(
        cardId,
        sessionData._id
      );
      setSessionData(updatedSession);
      return updatedSession;
    } catch (error) {
      console.error("Error updating card to learned:", error);
    }
  };

  const navigateToEdit = () => {
    navigate(`/editset/${setId}`);
  };

  if (allCardsLearned) {
    return (
      <div className="learn">
        <h3 className="titel_learn">Start all over again!</h3>
        <button className="refresh-button" onClick={handleRefreshSession}>
          Refresh Learnsession
        </button>
      </div>
    );
  }

  return (
    <div className="learn">
      <div className="div">
        <div className="overlap-group">
          <FlipCards
            activeCard={sessionData ? currentCard : []}
            index={flipped}
          />
          {/* <LoadingBar
            completed={
              sessionData
                ? sessionData.isLearned.length / sessionData.isLearned.length +
                  sessionData.toLearn.length
                : 0
            }
            maxCompleted={
              sessionData
                ? (sessionData.toLearn.length + sessionData.isLearned.length) /
                  (index + 1)
                : 0
            }
          /> */}

          {/* <LoadingBar /> */}

          <div className="group">
            <button className="ellipse" onClick={handleKeepInSession}></button>
            <div className="flipped-number">
              {sessionData
                ? `${index + 1} / ${sessionData.toLearn.length}`
                : ""}
            </div>
            <button
              className="ellipse-2"
              onClick={handleMoveToLearned}
            ></button>
          </div>
          <button className="refresh-btn" onClick={handleRefreshSession}>
            Refresh Learnsession
          </button>
          <button className="navigate-button" onClick={navigateToEdit}>
            Back to Edit Set
          </button>
        </div>
      </div>
    </div>
  );
};
