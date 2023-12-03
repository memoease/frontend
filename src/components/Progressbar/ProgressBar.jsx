import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

const LoadingBar = () => {
  const progressBarStyle = {
    boxShadow: "0 4px 80px rgba(0, 0, 0, 0.1)", // Add your box shadow style here
  };
  return (
    <ProgressBar
      completed="60"
      bgColor="#106899"
      baseBgColor="#C4D6E7"
      maxCompleted="70"
      margin=" 2rem auto"
      width="50%"
      minWidth="220px"
      animateOnRender="true"
      style={progressBarStyle}
    />
  );
};
export default LoadingBar;
