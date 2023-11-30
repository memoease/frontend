import { useNavigate } from "react-router-dom";
import Description from "./Description";


const CardInfo = ({ setId, flashcards, setNewCardAdded, newCardAdded }) => {
    const navigate = useNavigate();


    const toSession = () => {
        navigate(`/session/${setId}`);
    };


    console.log("flashcard:", flashcards);
    return (
        <div className="cardEdit">
            <Description description={flashcards.description} setId={setId} setNewCardAdded={setNewCardAdded} newCardAdded={newCardAdded} />
            <>
                {
                    (!flashcards.session || flashcards.session.toLearn.length === 0) ?
                        <button onClick={toSession}>Learn this set</button>
                        :
                        <button onClick={toSession}>Continue session</button>

                }

            </>
        </div>
    );
};

export default CardInfo;