import React from "react";
import "../../css/imprint.scss";
const Imprint = () => {
  return (
    <div className="ImprintContent">
      <div className="imprint-wrapper">
        <h2 className="title">Imprint</h2>

        <p className="informationtext">
          <strong>Information according to § 5 TMG:</strong>
        </p>
        <p>
          Operator and contact: MemoEase Developers <br />
          E-mail address:
          <a href="mailto:memoease.team@gmail.com">memoease.team@gmail.com</a>
        </p>

        <p>
          <strong>
            Responsible for journalistic-editorial content according to § 55 II
            RStV:
          </strong>
        </p>
        <p>MemoEase Developers</p>

        <p>
          <strong>Images and graphics:</strong>
        </p>
        <p>Source details for images and graphics used: Freepik</p>
      </div>
    </div>
  );
};

export default Imprint;
