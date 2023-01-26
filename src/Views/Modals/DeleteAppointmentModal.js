import { useContext } from "react";
import "../../styles/DeleteAppointmentModal.scss";
import ReactDOM from "react-dom";
import { AlertContext, AppointmentContext } from "../Scheduler";
import { MdOutlineClose } from "react-icons/md";
//delete appointment modal
const DeleteAppointmentModal = ({ id, onDelete, closeAppointmentDetails }) => {
  const alertContext = useContext(AlertContext);
  const appointmentContext = useContext(AppointmentContext);
  async function deleteAppointment() {
    try {
      await fetch(`http://localhost:5169/api/appointments/${id}`, {
        method: "DELETE",
      }).then(() => {
        appointmentContext.dispatch({
          type: "DELETE_APPOINTMENT",
        });
        onDelete();
        closeAppointmentDetails();
      });
      alertContext.handleAlert(true, "Appointment Deleted", "Success");
    } catch (e) {
      alertContext.handleAlert(true, "Error Occcured", "Error");
    }
  }
  return ReactDOM.createPortal(
    <div
      className="modal-background"
      onClick={() => {
        closeAppointmentDetails();
        onDelete(false);
      }}
    >
      <div
        className="delete-modal-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="close-button">
          <MdOutlineClose
            title="Close"
            className="close-delete-modal-icon"
            onClick={() => {
              onDelete(false);
            }}
          />
        </div>
        <div className="title">Are you Sure you want to Delete?</div>

        <div className="modal-button-container">
          <button
            onClick={() => {
              onDelete(false);
            }}
            id="cancel-button"
          >
            Cancel
          </button>
          <button onClick={() => deleteAppointment()}>Delete</button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DeleteAppointmentModal;
