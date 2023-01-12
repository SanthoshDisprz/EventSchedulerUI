//for agenda view - under development

import "../styles/Appointment.scss";
import calendarIcon from "../assets/appointmentIcons/icons8-calendar-100 (1).png";
import calendarIcon1 from "../assets/appointmentIcons/icons8-calendar-100.png";
import calendarIcon2 from "../assets/appointmentIcons/icons8-calendar-48 (1).png";
import calendarIcon3 from "../assets/appointmentIcons/icons8-calendar-48 (2).png";
import calendarIcon4 from "../assets/appointmentIcons/icons8-calendar-48.png";
import calendarIcon5 from "../assets/appointmentIcons/icons8-calendar-50 (1).png";
import calendarIcon6 from "../assets/appointmentIcons/icons8-calendar-50.png";
import calendarIcon7 from "../assets/appointmentIcons/icons8-calendar-64 (1).png";
import calendarIcon8 from "../assets/appointmentIcons/icons8-calendar-64 (2).png";
import calendarIcon9 from "../assets/appointmentIcons/icons8-calendar-64 (3).png";
import calendarIcon10 from "../assets/appointmentIcons/icons8-calendar-64 (4).png";
import calendarIcon11 from "../assets/appointmentIcons/icons8-calendar-64.png";
import dayjs from "dayjs";
import { useContext, useState } from "react";
// import { AppointmentIdContext } from "../store/AppointmentIdContext";
const Appointment = ({
  id,
  title,
  startTime,
  endTime,
  appointmentIdHandler,
}) => {
  // const appointmentIdContext = useContext(AppointmentIdContext);
  const images = [
    calendarIcon,
    calendarIcon1,
    calendarIcon2,
    calendarIcon3,
    calendarIcon4,
    calendarIcon5,
    calendarIcon6,
    calendarIcon7,
    calendarIcon8,
    calendarIcon9,
    calendarIcon10,
    calendarIcon11,
  ];
  const randomNumber = Math.floor(Math.random() * images.length);
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div
      className="appointment-container"
      onClick={() => {
        appointmentIdHandler(id);
      }}
    >
      <div className="appointment-data">
        <div className="appointment-image">
          <img
            src={images[randomNumber]}
            alt="appointment-icon"
            className="image"
          />
        </div>
        <div className="appointment-title-period-container">
          <div className="appointment-title">{title}</div>
          <div className="appointment-period">
            {dayjs(startTime).format("LT")} - {dayjs(endTime).format("LT")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
