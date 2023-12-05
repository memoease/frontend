import { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { SlCheck } from "react-icons/sl";
import { useParams } from "react-router-dom";
import { useCards } from "../../utilities/hooks/useCards";
import { updateSetInfoById } from "../../utilities/service/api";

const SetTitle = ({ title, setNewCardAdded, newCardAdded, editable }) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState({ title: title });
    const { updateSetsByUser } = useCards();
    const { setId } = useParams();

    const changeHandler = (evt) => {
        setNewTitle(prev => (
            {
                [evt.target.name]: evt.target.value
            }
        ));
    };

    const clickToEdit = () => {
        setEdit(true);
    };

    const saveNewTitle = async (evt) => {
        evt.preventDefault();
        try {
            const response = await updateSetInfoById(setId, newTitle);
            setNewCardAdded(!newCardAdded);
            updateSetsByUser();
            setEdit(false);
        } catch (error) {
            console.error(error);

        }
    };


    if (editable) {
        return (
            <>
                {!edit ?
                    <div className="set-title">
                        <h2>{title}</h2>
                        <button onClick={clickToEdit}>
                            <SlPencil />
                        </button>
                    </div>
                    :
                    <form className="set-title">
                        <input type="text" value={newTitle.title} name="title" onChange={changeHandler} />
                        <button onClick={saveNewTitle}>
                            <SlCheck />
                        </button>
                    </form>
                }
            </>
        )
    } else {
        return (
            <div className="set-title">
                <h2>{title}</h2>
            </div>
        )
    }
};

export default SetTitle;