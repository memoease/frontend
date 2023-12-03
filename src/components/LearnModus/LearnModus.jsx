import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FlipCards from "../FlipCards/FlipCards";
import LoadingBar from "../Progressbar/ProgressBar";

import {
  startLearnSession,
  updateSessionCardToLearned,
  refreshLearnSession,
} from "../../utilities/service/api";

export const LearnModus = () => {
  const [sessionData, setSessionData] = useState(null);
  const [currentCard, setCurrentCard] = useState(null); // Current card being considered
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(true);
  const { setId } = useParams(); // Extracting setId from route params

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
    // Move the current card to "isLearned"
    if (sessionData && currentCard) {
      const cardIdToUpdate = currentCard._id;
      const sessionId = sessionData._id; // Stellen Sie sicher, dass sessionId definiert ist
      const updatedSession = await updateCardToLearned(cardIdToUpdate);
      setCurrentCard(updatedSession.toLearn[index]);
      setFlipped(!flipped);
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
    setIndex(nextIndex);
    setCurrentCard(sessionData.toLearn[nextIndex]);
    setFlipped(!flipped);
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
          <LoadingBar />

          <div className="group">
            <button className="ellipse" onClick={handleKeepInSession}></button>
            <div className="flipped-number">
              {sessionData
                ? `${sessionData.toLearn.indexOf(currentCard) + 1} / ${
                    sessionData.toLearn.length
                  }`
                : ""}
            </div>
            <button
              className="ellipse-2"
              onClick={handleMoveToLearned}
            ></button>
          </div>
          <button className="refresh-button" onClick={handleRefreshSession}>
            Refresh Learnsession
          </button>
        </div>
      </div>
    </div>
  );
};
