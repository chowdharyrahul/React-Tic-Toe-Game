import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing); // for updating state, work with latest state value
        

        if(isEditing){
        onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {  // object describing event
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let btnCaption = 'Edit';

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
        // two way binding used above as we getting value out and then getting value in.
        btnCaption = "Save";
    }

    return (
        <li className={isActive ?  'active': undefined}>
            <span className="player"></span>
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    );
}