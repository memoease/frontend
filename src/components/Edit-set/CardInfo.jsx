import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteSetBySetId,
  updateSetInfoById,
} from "../../utilities/service/api";
import Description from "./Description";
import ModalSetting from "../ModalSetting/ModalSetting";
import { useCards } from "../../utilities/hooks/useCards";

const CardInfo = ({
  setId,
  flashcards,
  setNewCardAdded,
  newCardAdded,
  editable,
}) => {
  const navigate = useNavigate();
  const [setAccess, setSetAccess] = useState(flashcards.isPublic);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { updateSetsByUser } = useCards();
  const toSession = () => {
    navigate(`/session/${setId}`);
  };

  const changeSetAccess = async () => {
    try {
      const data = {
        isPublic: !flashcards.isPublic,
      };
      const response = await updateSetInfoById(setId, data);
      setNewCardAdded(!newCardAdded);
      setSetAccess(response.isPublic);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancels = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirms = async () => {
    try {
      await deleteSetBySetId(setId);

      console.log("Set deleted successfully");
      setNewCardAdded(!newCardAdded);
      updateSetsByUser();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting set", error);
    }

    setShowDeleteModal(false);
  };

  if (editable) {
    return (
      <div className="cardEdit">
        <Description
          description={flashcards.description}
          setId={setId}
          setNewCardAdded={setNewCardAdded}
          newCardAdded={newCardAdded}
          editable={editable}
        />
        <section className="set-access">
          {setAccess
            ? "Everybody can see this set."
            : "No one can see it. Only you."}

          <div className="setButton">
            {setAccess ? (
              <button onClick={changeSetAccess}>Change to private</button>
            ) : (
              <button onClick={changeSetAccess}>Change to public</button>
            )}

            <button>Create a Group</button>
          </div>
        </section>

        <div className="delete-button">
          <button onClick={handleDeleteConfirm}>Delete</button>
          <ModalSetting
            modalText="Are you sure to delete this set?"
            confirmButtonText="Yes!"
            cancelButtonText="No!"
            showDeleteModal={showDeleteModal}
            handleDeleteConfirms={handleDeleteConfirms}
            handleDeleteCancels={handleDeleteCancels}
          />

          {!flashcards.session || flashcards.session.toLearn?.length === 0 ? (
            <button onClick={toSession}>Learn this set</button>
          ) : (
            <button onClick={toSession}>Continue session</button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="cardEdit">
        <Description
          description={flashcards.description}
          setId={setId}
          setNewCardAdded={setNewCardAdded}
          newCardAdded={newCardAdded}
          editable={editable}
        />
      </div>
    );
  }
};

export default CardInfo;
