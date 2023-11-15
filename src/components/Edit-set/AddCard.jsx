import { useState } from "react"
import { Form } from "react-router-dom";


export default function AddCard({ setFakeDB, fakeDB }) {

    const [entry, setEntry] = useState({
        question: "",
        answer: ""
    });
    const styleUnderline = {
        borderBottom: "2px solid black"
    };

    const changeHandler = (evt) => {
        setEntry(prev => (
            {
                ...prev,
                _id: fakeDB.length + 1,
                [evt.target.name]: evt.target.value
            }
        ));
        console.log(entry);
    };

    const saveEntry = (evt) => {
        evt.preventDefault();
        setFakeDB(prev => ([
            ...prev,
            entry
        ]));
        setEntry({
            question: "",
            answer: ""
        });
    };



    return (
        <form >
            <div className="inputCards">
                <input type="text" name="question" value={entry.question} onChange={changeHandler} required style={styleUnderline} />
                <input type="text" name="answer" value={entry.answer} onChange={changeHandler} style={styleUnderline} required />

                <button className="EditBtn" onClick={saveEntry}>
                    Save
                </button>
            </div>
        </form>
    );
};