import React from "react";
import "../../css/EditSet.scss";
import SimpleSlider from "./EditSetSlider";
const EditSet = () => {
  return (
    <div className="EditSet_Container">
      <h2>Englich</h2>
      {/* Radown (Arbeit Bereich) */}
      <div className="">
        <div className="slider">
          <SimpleSlider />
        </div>
      </div>
      {/* Imad (Arbeit Bereich) */}
      <div className="FromEdit">
        <form>
          <div className="inputCards">
            <input type="text" placeholder="words" />
            <input type="text" placeholder="worte" />
            <button className="EditBtn" type="submit">
              Edit
            </button>
          </div>
        </form>
        <form>
          <div className="inputCards">
            <input type="text" placeholder="words" />
            <input type="text" placeholder="worte" />
            <button className="EditBtn" type="submit">
              Edit
            </button>
          </div>
        </form>
        <form>
          <div className="inputCards">
            <input type="text" placeholder="words" />
            <input type="text" placeholder="worte" />
            <button className="EditBtn" type="submit">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSet;
