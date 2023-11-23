import React, { useState } from "react";
import { useAuth } from "../../utilities/hooks/useAuth";
import { postNewFlashcardSet } from "../../utilities/service/api";
import { useNavigate } from "react-router-dom";

import "./style.css";

export const Box = () => {
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
      console.error("Error creating the flashcard set:", error);

      // Check if the error has a response and data property
      if (error.response && error.response.data) {
        const { error: errorMessage } = error.response.data;

        if (errorMessage) {
          console.error(`API error message: ${errorMessage}`);
        }
      }
    }
  };

  return (
    <div className="box create-set">
      <h2>Create a new Flashcard Set</h2>
      <form onSubmit={handleSave}>
        <div className="group">
          <div>
            <label htmlFor="title">Enter title:</label>
            <input
              id="title"
              type="text"
              placeholder="Title (required)"
              value={formData.title}
              onChange={handleChange("title")}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Enter description:</label>
            <textarea
              id="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange("description")}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="save">
          Save
        </button>
      </form>
    </div>
  );
};
