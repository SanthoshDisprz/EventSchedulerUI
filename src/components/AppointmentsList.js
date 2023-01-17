import "../styles/AppointmentsList.scss";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import { MdOutlineClose } from "react-icons/md";
const AppointmentsList = ({ appointments, appointmentIdHandler, handleAppointmentsList }) => {
    // console.log("clicked")
  return (
    
    <div className="appointments-list-date">
        <MdOutlineClose className="close-appointments-list" onClick={()=>handleAppointmentsList()}></MdOutlineClose>
        <div className="appointments-list-date-container">
        <div>{dayjs(appointments.startTime).format("ddd")}</div>
        <div>{dayjs(appointments.startTime).format("D")}</div>
        </div>
      {appointments.map((appointment) => (
        <div
          className="appointment"
          onClick={() => appointmentIdHandler(appointment.id)}
        >
          {appointment.title}
        </div>
      ))}
    </div>
    
  );
};

export default AppointmentsList;
