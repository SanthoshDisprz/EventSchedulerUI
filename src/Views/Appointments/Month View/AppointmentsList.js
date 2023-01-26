import "../../../styles/AppointmentsList.scss"
import dayjs from "dayjs";
import { MdOutlineClose } from "react-icons/md";
import ReactDOM from "react-dom";

const AppointmentsList = ({ appointments, handleAppointmentsList, appointmentDetailsHandler }) => {
  var localizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(localizedFormat)
  return ReactDOM.createPortal(
    <div className="appointments-list-background" onClick={() => handleAppointmentsList()}>
      <div className="appointments-list-for-date-container" onClick={(e)=>e.stopPropagation()}>
        <div className="close-icon-date-container">
          <div className="appointments-list-date-container">
            {dayjs(appointments[0].startTime.substring(0, 19)).format("LL")}
          </div>
          <MdOutlineClose className="close-appointments-list" onClick={() => handleAppointmentsList()}></MdOutlineClose>
        </div>
        <div className="appointments-list-for-date">
          {appointments.map((appointment) => (
            <div
              className="appointment-for-date"
              onClick={() => appointmentDetailsHandler(appointment)}
            >
              {appointment.title}
            </div>
          ))}
        </div>
      </div>
    </div>, document.getElementById("portal")

  );
};

export default AppointmentsList;
