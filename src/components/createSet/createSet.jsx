import React, { useState } from "react";
import { useAuth } from "../../utilities/hooks/useAuth";
import { postNewFlashcardSet } from "../../utilities/api";
import { useNavigate } from "react-router-dom";

import "./style.css";

export const CreateSet = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (field) => (evt) => {
    setFormData({
      ...formData,
      [field]: evt.target.value,
    });
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    saveFlashcardSet();
  };

  const saveFlashcardSet = async () => {
    try {
      // Create an object with user inputs, including the user ID
      const setData = {
        title: formData.title,
        description: formData.description,
        createdBy: user.id,
      };

      // Call the API to create the flashcard set
      const newSet = await postNewFlashcardSet(setData);

      console.log("New flashcard set created:", newSet);

      // Redirect the user to the "edit set" page
      navigate(`/editset/${newSet._id}`);
    } catch (error) {
      // Handle errors if the API call fails
      console.error("Error creating the flashcard set:", error);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="create-set">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="group">
              <div>
                <input
                  className="overlap-group"
                  type="text"
                  placeholder="enter title"
                  value={formData.title}
                  onChange={handleChange("title")}
                />
              </div>
              <div>
                <textarea
                  className="div-wrapper"
                  placeholder="enter description"
                  value={formData.description}
                  onChange={handleChange("description")}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
