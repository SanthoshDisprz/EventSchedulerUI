import "../styles/CreateAppointment.scss";
import { BsPlusLg } from "react-icons/bs";
import { useContext } from "react";
import { AppointmentContext } from "./Scheduler";
//Create Appointment Button
const CreateAppointment = () => {
  const appointmentContext = useContext(AppointmentContext);

  return (
    <>
      <div
        className="create-appointment-button"
        onClick={() =>
          appointmentContext.dispatch({
            type: "CREATE_APPOINTMENT_MODAL",
            payload: true,
          })
        }
      >
        <BsPlusLg />
        <div className="create-appointment">Create Appointment</div>
      </div>
    </>
  );
};

export default CreateAppointment;
