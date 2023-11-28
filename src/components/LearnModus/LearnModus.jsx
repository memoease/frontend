import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../css/LearnModus.scss";
import FlipCards from "../FlipCards/FlipCards";

import {
  startLearnSession,
  updateSessionCardToLearned,
  refreshLearnSession,
} from "../../utilities/service/api";

export const LearnModus = () => {
  const [sessionData, setSessionData] = useState(null);
  const [currentCard, setCurrentCard] = useState(null); // Current card being considered
  const { setId } = useParams(); // Extracting setId from route params

  useEffect(() => {
    const startSession = async () => {
      try {
        // Start Learn Session
        const session = await startLearnSession(setId);
        setSessionData(session);

        // Set the initial current card
        if (session.toLearn && session.toLearn.length > 0) {
          setCurrentCard(session.toLearn[0]);
        }
      } catch (error) {
        console.error("Error in LearnSession useEffect:", error.response.data);
      }
    };

    startSession();
  }, [setId]); // Include setId in the dependency array so that the effect re-runs when it changes

  const handleMoveToLearned = async () => {
    // Move the current card to "isLearned"
    if (sessionData && currentCard) {
      const cardIdToUpdate = currentCard._id;
      const sessionId = sessionData._id; // Stellen Sie sicher, dass sessionId definiert ist
      const updatedSession = await updateCardToLearned(cardIdToUpdate);
      setCurrentCard(updatedSession.toLearn[0]);
    }
  };

  const handleKeepInSession = () => {
    // Advance to the next card without updating the current card
    advanceToNextCard();
  };

  const handleRefreshSession = async () => {
    // Refresh the Learn Session
    if (sessionData && sessionData._id) {
      const updatedSession = await refreshLearnSession(sessionData._id);
      setSessionData(updatedSession);

      // Set the initial current card after refresh
      if (updatedSession.toLearn && updatedSession.toLearn.length > 0) {
        setCurrentCard(updatedSession.toLearn[0]);
      }
    }
  };

  const advanceToNextCard = () => {
    // Find the index of the current card
    const currentIndex = sessionData.toLearn.indexOf(currentCard);

    // Increment the index and handle boundary conditions
    const nextIndex = (currentIndex + 1) % sessionData.toLearn.length;
    setCurrentCard(sessionData.toLearn[nextIndex]);
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

  if (sessionData.length > 0) {
    return (
      <div className="learn">
        <div className="div">
          <div className="overlap-group">
            <FlipCards activeCard={sessionData ? currentCard : []} />
            <div className="group">
              <button className="ellipse" onClick={handleKeepInSession}></button>
              <div className="flipped-number">
                {sessionData
                  ? `${sessionData.toLearn.indexOf(currentCard) + 1} / ${sessionData.toLearn.length
                  }`
                  : ""}
              </div>
              <button
                className="ellipse-2"
                onClick={handleMoveToLearned}
              ></button>

            </div>

          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="overlap-group">
        <h3>Start all over again!</h3>
        <button className="refresh-button" onClick={handleRefreshSession}>
          Refresh Learnsession
        </button>
      </div>
    )
  }
};
