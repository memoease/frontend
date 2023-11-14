import React from "react";
import "./style.css";
import FlipCards from "../FlipCards/FlipCards";

export const LearnModus = () => {
  return (
    <div className="learn">
      <div className="div">
        <div className="overlap-group">
          <FlipCards />
        </div>
        <div className="text-wrapper">English</div>
        <div className="group">
          <div className="ellipse" />
          <div className="ellipse-2" />
          <div className="text-wrapper-2">2 / 4</div>
        </div>
      </div>
    </div>
  );
};
