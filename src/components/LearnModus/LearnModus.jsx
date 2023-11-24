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
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Index of the current card being considered
  const { setId } = useParams(); // Extracting setId from route params

  useEffect(() => {
    const startSession = async () => {
      try {
        // Start Learn Session

        const session = await startLearnSession(setId);
        setSessionData(session);
      } catch (error) {
        console.error("Error in LearnModus useEffect:", error.response.data);
      }
    };

    startSession();
  }, [setId]); // Include setId in the dependency array so that the effect re-runs when it changes

  const handleMoveToLearned = async () => {
    // Move the current card to "isLearned"
    if (sessionData && sessionData.toLearn && sessionData.toLearn.length > 0) {
      const cardIdToUpdate = sessionData.toLearn[currentCardIndex]._id;
      await updateCardToLearned(cardIdToUpdate);
      advanceToNextCard();
    }
  };

  const handleKeepInSession = async () => {
    // Advance to the next card without updating the current card
    advanceToNextCard();
  };

  const advanceToNextCard = () => {
    // Increment the currentCardIndex and handle boundary conditions
    setCurrentCardIndex(
      (prevIndex) => (prevIndex + 1) % sessionData.toLearn.length
    );
  };

  const updateCardToLearned = async (cardId) => {
    try {
      // Update Card to Learned
      const updatedSession = await updateSessionCardToLearned(cardId);
      setSessionData(updatedSession);
    } catch (error) {
      console.error("Error updating card to learned:", error);
    }
  };

  return (
    <div className="learn">
      <div className="div">
        <div className="overlap-group">
          <FlipCards flashcards={sessionData ? sessionData.toLearn : []} />
          <div className="group">
            <button className="ellipse" onClick={handleMoveToLearned}></button>
            <div className="flipped-number">
              {sessionData
                ? `${currentCardIndex + 1} / ${sessionData.toLearn.length}`
                : ""}
            </div>
            <button
              className="ellipse-2"
              onClick={handleKeepInSession}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
