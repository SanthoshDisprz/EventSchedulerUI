import "../styles/Appointment.scss";
import dayjs from "dayjs";
const Appointment = ({
  title,
  startTime,
  endTime,
}) => {
  var localizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(localizedFormat)
  return (
    <div
      className="appointment-container"
    >
      <div className="appointment-data">
        <div className="appointments-list-date-container">
          <div>{dayjs(startTime.substring(0, 19)).format("MMM")}</div>
          <div>{dayjs(startTime.substring(0, 19)).format("D")}</div>
        </div>
        <div className="appointment-title-period-container">
          <div className="appointment-title">{title}</div>
          <div className="appointment-period">
            {dayjs(startTime.substring(0, 19)).format("LT")} - {dayjs(endTime.substring(0, 19)).format("LT")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
