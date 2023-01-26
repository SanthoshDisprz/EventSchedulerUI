import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import "../styles/GuestsListInput.scss";
//input tag for guests list
const GuestsListInput = ({ onAddGuest, handleInvalidMailAlert }) => {
  const [guestsList, setGuestsList] = useState("");

  const emailValidator = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }
  console.log(emailValidator)
  return (
    <div className="guest-list">
      <input
        type="email"
        placeholder="Add Guests"
        value={guestsList}
        onChange={(e) => {setGuestsList(e.target.value); handleInvalidMailAlert(false)}}
        spellCheck="false"
      />
      {guestsList && (
        <IoPersonAddSharp
          onClick={(e) => {
            e.preventDefault();
            if (!emailValidator(guestsList)){handleInvalidMailAlert(true); return};
            onAddGuest(guestsList);
            setGuestsList("");
          }}
          className="add-guest-icon"
        />
      )}
      
    </div>
  );
};

export default GuestsListInput;
