import React from "react";
import "../../css/ModalSetting.scss";

const ModalSetting = ({
  showDeleteModal,
  handleDeleteConfirms,
  handleDeleteCancels,
  modalText,
  confirmButtonText,
  cancelButtonText,
}) => {
  if (!showDeleteModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <p>{modalText}</p>
        <div className="btn">
          <button onClick={handleDeleteConfirms}>{confirmButtonText}</button>
          <button onClick={handleDeleteCancels}>{cancelButtonText}</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSetting;
