
const ShowCards = ({ question = "", answer = "" }) => {
    return (
        <div className="inputCards">
            <p>{question}</p>
            <p>{answer}</p>
        </div>
    )
};

export default ShowCards;