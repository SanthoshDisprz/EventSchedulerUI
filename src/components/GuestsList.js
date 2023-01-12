import { MdOutlineClose } from "react-icons/md";
import "../styles/GuestsList.scss";
//show guest list while adding in input
const GuestsList = ({ guestsList, deleteGuestHandler }) => {
  return (
    guestsList.length > 0 && (
      <div>
        {guestsList.map((guest, index) => (
          <div className="guest-profile" key={index}>
            <div className="guest-profile-picture-name-container">
              <div className="guest-profile-picture">
                {guest[0].toUpperCase()}
              </div>
              {guest}
            </div>
            <MdOutlineClose
              onClick={() => deleteGuestHandler(index)}
              className="remove-guest"
            />
          </div>

          // </div>
        ))}
      </div>
    )
  );
};

export default GuestsList;
