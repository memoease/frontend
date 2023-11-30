import { useNavigate } from "react-router-dom";
import Description from "./Description";


const CardInfo = ({ setId, description, setNewCardAdded, newCardAdded }) => {
    const navigate = useNavigate();


    const toSession = () => {
        navigate(`/session/${setId}`);
    };

    return (
        <div className="cardEdit">
            <Description description={description} setId={setId} setNewCardAdded={setNewCardAdded} newCardAdded={newCardAdded} />
            <button onClick={toSession}>start</button>
        </div>
    );
};

export default CardInfo;