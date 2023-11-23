import { useState } from "react"


export default function ShowAndEditCards({ question = "", answer = "", id }) {

    const [disabled, setDisabled] = useState(true);
    const [newCard, setNewCard] = useState({
        question: question,
        answer: answer
    });

    const handleClick = (evt) => {
        evt.preventDefault();
        setDisabled(!disabled);
    };



    return (
        <form key={id}>
            <div className="inputCards" >
                <input type="text" name="question" value={newCard.question} disabled={disabled} required />
                <input type="text" name="answer" value={newCard.answer} disabled={disabled} required />
                {disabled ?
                    <button className="EditBtn" onClick={handleClick} >
                        Edit
                    </button>
                    :
                    <button className="EditBtn" onClick={handleClick} >
                        Save
                    </button>
                }
            </div>
        </form>
    );
};