import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

const LoadingBar = ({ completed, maxCompleted }) => {
  const progressBarStyle = {
    boxShadow: "0 4px 80px rgba(0, 0, 0, 0.1)", // Add your box shadow style here
  };
  return (
    <ProgressBar
      maxCompleted={maxCompleted}
      completed={completed}
      bgColor="#106899"
      baseBgColor="#C4D6E7"
      margin=" 2rem auto"
      width="50%"
      minWidth="220px"
      style={progressBarStyle}
      customLabel=":)"
    />
  );
};
export default LoadingBar;
