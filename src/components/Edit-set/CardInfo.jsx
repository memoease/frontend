import { useNavigate } from "react-router-dom";
import Description from "./Description";


const CardInfo = ({ setId, description, setNewCardAdded }) => {
    const navigate = useNavigate();


    const toSession = () => {
        navigate(`/session/${setId}`);
    };

    return (
        <div className="cardEdit">
            <Description description={description} setId={setId} setNewCardAdded={setNewCardAdded} />
            <button onClick={toSession}>start</button>
        </div>
    )
};

export default CardInfo;