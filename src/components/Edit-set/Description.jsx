import { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { SlCheck } from "react-icons/sl";
import { useCards } from "../../utilities/hooks/useCards";

import { updateSetInfoById } from "../../utilities/service/api";

const Description = ({ description, setId, setNewCardAdded, newCardAdded }) => {
    const [edit, setEdit] = useState(false);
    const [newDescript, setNewDescript] = useState({
        description: description
    });
    const { updateSetsByUser } = useCards();

    const changeHandler = (evt) => {
        setNewDescript(prev => (
            {
                [evt.target.name]: evt.target.value
            }
        ));
    };

    const clickToEdit = () => {
        setEdit(true);
    };

    const saveNewDescription = async (evt) => {
        evt.preventDefault();
        try {
            const response = await updateSetInfoById(setId, newDescript);
            setNewCardAdded(!newCardAdded);
            updateSetsByUser();
            setEdit(false);
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <>
            {!edit ?
                <div className="set-description">
                    <section>
                        <h4>description:</h4>
                        <p>{description}</p>
                    </section>
                    <button onClick={clickToEdit}>
                        <SlPencil />
                    </button>
                </div>
                :
                <div className="set-description">
                    <form action="submit">
                        <h4>description:</h4>
                        <input type="text" value={newDescript.description} name="description" onChange={changeHandler} />
                    </form>
                    <button onClick={saveNewDescription}>
                        <SlCheck />
                    </button>
                </div>
            }
        </>
    );
};

export default Description;