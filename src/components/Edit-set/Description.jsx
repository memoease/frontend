import { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { SlCheck } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useCards } from "../../utilities/hooks/useCards";

import {
  postNewSetFromPublicSet,
  updateSetInfoById,
} from "../../utilities/service/api";

const Description = ({
  description,
  setId,
  setNewCardAdded,
  newCardAdded,
  editable,
}) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [newDescript, setNewDescript] = useState({
    description: description,
  });
  const { updateSetsByUser } = useCards();

  const changeHandler = (evt) => {
    setNewDescript((prev) => ({
      [evt.target.name]: evt.target.value,
    }));
  };

  const clickToEdit = () => {
    setEdit(true);
  };

  const saveNewDescription = async (evt) => {
    evt.preventDefault();
    try {
      const response = await updateSetInfoById(setId, newDescript);
      setNewCardAdded(!newCardAdded);
      updateSetsByUser();
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const copySetToDashboard = async () => {
    try {
      console.log("setIdtoCopy:", setId);
      const response = await postNewSetFromPublicSet(setId);
      const newSetId = response._id;
      updateSetsByUser();
      navigate(`/editset/${newSetId}`);
    } catch (error) {
      console.error("Error copying set to Dashboard:", error);
    }
  };

  if (editable) {
    return (
      <>
        {!edit ? (
          <div className="set-description">
            <section>
              <h4>description:</h4>
              <p>{description}</p>
            </section>
            <button
              onClick={clickToEdit}
              style={{
                backgroundColor: "#ff8800",
                width: "45px",
                margin: "0.5rem auto ",
              }}
            >
              <SlPencil style={{ color: "white", fontSize: "16px" }} />
            </button>
          </div>
        ) : (
          <div className="set-description">
            <form action="submit">
              <h4>description:</h4>
              <input
                type="text"
                value={newDescript.description}
                name="description"
                onChange={changeHandler}
                style={{ borderRadius: "2rem", textAlign: "center" }}
              />
            </form>
            <button
              onClick={saveNewDescription}
              style={{
                backgroundColor: "#ff8800",
                width: "50px",
                margin: "0.5rem auto ",
                color: "white",
              }}
            >
              <SlCheck />
            </button>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="set-description">
          <section>
            <h4>description:</h4>
            <p>{description}</p>
          </section>

          <button onClick={copySetToDashboard}>
            Copy this set to your Dashboard
          </button>
        </div>
      </>
    );
  }
};

export default Description;
