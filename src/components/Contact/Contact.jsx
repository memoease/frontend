import React, { useEffect, useState } from "react";

import "../../css/App.scss";
import { NavLink } from "react-router-dom";
const Contact = () => {
  const [showContent, setShowContent] = useState(false);

  const handleContentNavClick = () => {
    setShowContent(!showContent);
  };
  const handleLinkClick = () => {
    setShowContent(true); // Öffne den Content-Bereich, wenn auf den Link geklickt wird
  };

  return (
    <div className="contact_repper">
      <div className="wrpper-contact">
        <h1 className="text-center">Contact Us</h1>
        <button className="btn" onClick={handleContentNavClick}>
          Click my
        </button>
        <div className={`content ${showContent ? "show" : ""}`}>
          <p>
            Just like you, our hunger for knowledge knows no bounds. We eagerly
            welcome your thoughts, whether they're comments, opinions, or
            expressions of appreciation. Your input fuels our passion for
            learning. Feel free to drop us a line; we can't wait to engage with
            your insights and ideas.
          </p>

          <a className="email" href="mailto:memoease.team@gmail.com">
            E-Mail: memoease.team@gmail.com
          </a>

          <NavLink
            to="/imprint"
            className="linkToImprint"
            onClick={handleLinkClick}
          >
            Imprint
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Contact;
