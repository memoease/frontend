import React from "react";
import "../../css/LearnModus.scss";
import FlipCards from "../FlipCards/FlipCards";

export const LearnModus = () => {
  return (
    <div className="learn">
      <div className="div">
        <div className="overlap-group">
          <FlipCards />
          <div className="group">
            <div className="ellipse" />
            <div className="flipped-number">2 / 4</div>
            <div className="ellipse-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
