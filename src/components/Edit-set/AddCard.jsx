import { useState } from "react";
import { Form } from "react-router-dom";
import { useCards } from "../../utilities/hooks/useCards";
import { postNewCardToSet } from "../../utilities/service/api";

export default function AddCard({ setId, setNewCardAdded, newCardAdded }) {
  const { updateSetsByUser } = useCards();
  const [entry, setEntry] = useState({
    question: "",
    answer: "",
  });
  const styleUnderline = {
    borderBottom: "2px solid black",
  };

  const changeHandler = (evt) => {
    setEntry((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const saveEntry = async (evt) => {
    evt.preventDefault();
    await postNewCardToSet(setId, entry);
    setNewCardAdded(!newCardAdded);
    await updateSetsByUser();
    setEntry({
      question: "",
      answer: "",
    });
  };

  return (
    <form>
      <div className="inputCards">
        <textarea
          type="text"
          name="question"
          value={entry.question}
          onChange={changeHandler}
          required
          style={styleUnderline}
        />
        <textarea
          type="text"
          name="answer"
          value={entry.answer}
          onChange={changeHandler}
          style={styleUnderline}
          required
        />

        <button className="EditBtn" onClick={saveEntry}>
          Save
        </button>
      </div>
    </form>
  );
}
