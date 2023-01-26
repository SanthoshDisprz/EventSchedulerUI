import "../../../styles/AppointmentsList.scss";
import dayjs from "dayjs";
import { MdOutlineClose } from "react-icons/md";
import ReactDOM from "react-dom";

const AppointmentsList = ({
  appointments,
  handleAppointmentsList,
  appointmentDetailsHandler,
}) => {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  return ReactDOM.createPortal(
    <div
      className="appointments-list-background"
      onClick={() => handleAppointmentsList()}
    >
      <div
        className="appointments-list-for-date-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close-icon-date-container">
          <div className="appointments-list-date-container">
            {dayjs(appointments[0].startTime.substring(0, 19)).format("LL")}
          </div>
          <MdOutlineClose
            className="close-appointments-list"
            onClick={() => handleAppointmentsList()}
          ></MdOutlineClose>
        </div>
        <div className="appointments-list-for-date">
          {appointments
            .sort(function (a, b) {
              return a.startTime.localeCompare(b.startTime);
            })
            .map((appointment) => (
              <div
                className="appointment-for-date"
                onClick={() => appointmentDetailsHandler(appointment)}
              >
                <div>{appointment.title}</div>
                <div>{dayjs(appointment.startTime).format("LT")} - {dayjs(appointment.endTime).format("LT")}</div>
              </div>
            ))}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default AppointmentsList;
