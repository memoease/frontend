import { useState } from "react"
import { deleteOneCardById, updateCardById } from "../../utilities/service/api";


export default function ShowAndEditCards({ question = "", answer = "", cardId, setNewCardAdded, newCardAdded }) {

    const [disabled, setDisabled] = useState(true);
    const [newCard, setNewCard] = useState({
        question: question,
        answer: answer
    });

    const changeHandler = (evt) => {
        setNewCard(prev => (
            {
                ...prev,
                [evt.target.name]: evt.target.value
            }
        ));
    };

    const handleClick = (evt) => {
        evt.preventDefault();
        setDisabled(!disabled);
    };

    const updateHandler = async (evt) => {
        evt.preventDefault();
        try {
            const response = await updateCardById(cardId, newCard);
        } catch (error) {
            console.error(error);
        };

        setNewCardAdded(!newCardAdded);
        setDisabled(!disabled);
    };

    const deleteHandler = async (evt) => {
        evt.preventDefault();
        try {
            await deleteOneCardById(cardId);
        } catch (error) {
            console.error(error);
        }
        setNewCardAdded(!newCardAdded);
        setDisabled(!disabled);
    };



    return (
        <form key={cardId}>
            <div className="inputCards" >
                <input type="text" name="question" value={newCard.question} disabled={disabled} required onChange={changeHandler} />
                <input type="text" name="answer" value={newCard.answer} disabled={disabled} required onChange={changeHandler} />
                {disabled ?
                    <button className="EditBtn" onClick={handleClick} >
                        Edit
                    </button>
                    :
                    <div className="btn-container">
                        <button className="EditBtn" onClick={updateHandler} >
                            Save
                        </button>
                        <button className="EditBtn" onClick={deleteHandler} >
                            Delete
                        </button>
                    </div >
                }
            </div>
        </form>
    );
};