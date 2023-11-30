import { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { SlCheck } from "react-icons/sl";
import { useParams } from "react-router-dom";
import { updateSetInfoById } from "../../utilities/service/api";

const SetTitle = ({ title, setNewCardAdded }) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState({ title: title });

    const { setId } = useParams();

    const changeHandler = (evt) => {
        setNewTitle(prev => (
            {
                [evt.target.name]: evt.target.value
            }
        ));
        console.log(newTitle.title);
    };

    const clickToEdit = () => {
        setEdit(true);
    };

    const saveNewTitle = async (evt) => {
        evt.preventDefault();
        try {
            const response = await updateSetInfoById(setId, newTitle);
            setNewCardAdded(!setNewCardAdded);
            console.log(response);
            setEdit(false);
        } catch (error) {
            console.error(error);

        }
    }



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
};

export default SetTitle;