import React from "react";
import "../../css/ModalSetting.scss";
const ModalSetting = ({
  showDeleteModal,
  handleDeleteConfirms,
  handleDeleteCancels,
}) => {
  if (!showDeleteModal) {
    // Zeige kein Modal, wenn showDeleteModal false ist
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <p>Do you really want to delete your account?</p>
        <div className="btn">
          <button onClick={handleDeleteConfirms}>Yes, I'm sure</button>
          <button onClick={handleDeleteCancels}>No way!</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSetting;
