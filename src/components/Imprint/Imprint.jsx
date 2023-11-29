import React from "react";
import "../../css/imprint.scss";
const Imprint = () => {
  return (
    <div className="ImprintContent">
      <div className="imprint-wrapper">
        <h2 className="title">Imprint</h2>
        <div className="line"></div>
        <ul>
          <div className="ulOne">
            <li className="informationtext">
              <strong>Information according to § 5 TMG:</strong>
            </li>

            <li>Responsible for editorial content under § 55 II RStV:</li>

            <li>
              This website is a platform for educational purposes providing
              tools and resources for personal development.
            </li>

            <li>
              Operator and contact: MemoEase Developers <br />
              E-mail address:
              <a href="mailto:memoease.team@gmail.com">
                memoease.team@gmail.com
              </a>
            </li>
          </div>
          <div className="ulTwo">
            <li>MemoEase Developers</li>
            <li>Images and graphics:</li>
            <li>Source details for images and graphics used: Freepik</li>
            <li>
              Created to foster learning and personal growth through content.
            </li>

            <li>
              Any graphics or images not attributed here are created by MemoEase
              Developers or used with permission from the respective creators.
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Imprint;
