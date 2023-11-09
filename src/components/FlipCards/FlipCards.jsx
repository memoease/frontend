import React, { useState } from "react";
import CardFlip from "react-card-flip";

function FlipCardExample() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <CardFlip
        isFlipped={isFlipped}
        flipDirection="vertical"
        flipSpeedBackToFront={2}
        flipSpeedFrontToBack={2}
      >
        <div>
          <div
            onClick={handleClick}
            style={{
              border: "2px solid",
              width: "682px",
              height: "384px",
              backgroundColor: "lightblue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Frontd
          </div>
        </div>
        <div>
          <div
            onClick={handleClick}
            style={{
              border: "2px solid",
              width: "682px",
              height: "384px",
              backgroundColor: "#E4F2E7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Back
          </div>
        </div>
      </CardFlip>
    </div>
  );
}

export default FlipCardExample;
