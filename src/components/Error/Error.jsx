import React from "react";
import ErrorMessage from "../../assets/Fehler-Problem.webp";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <div className="errorContent">
      <div className="errorOccurred">
        <img src={ErrorMessage} alt="error message" />
        <div className="textErro">
          Die eingegebene Webadresse ist ungültig. Prüfen Sie auf Tippfehler.
          Die Seite existiert vielleicht nicht oder ist vorübergehend nicht
          erreichbar
        </div>
        <NavLink className="Link_HomePage" to="/">
          Home page
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
