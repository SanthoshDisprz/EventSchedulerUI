import "../../../styles/TimelineView.scss";
import dayjs from "dayjs";
import { useContext } from "react";
import { AppointmentContext } from "../../../Views/Scheduler/Scheduler";
//timeline view component
const TimelineView = ({ appointments, appointmentDetailsHandler, selectedDate }) => {
  const appointmentContext = useContext(AppointmentContext);
  //generate time for timeline view
  const time = ["12 AM"];

  for (let i = 1; i < 24; i++) {
    if (i < 12) time.push(i + " " + "AM");
    else if (i > 12) time.push(i - 12 + " " + "PM");
    else time.push("12 PM");
  }
  //function for finding the time interval in which the appointment time starts
  const appointmentTimeIntervalFinder = (startTimeBoundary) => {
    const filteredAppointments = appointments.filter(
      (appointment) =>
        dayjs(appointment.startTime.substring(0, 19)).format("h A") ===
        startTimeBoundary
    );
    return filteredAppointments;
  };
  //function for finding the top% of the appointment, so that the appointment div should be adjusted accordingly
  const appointmentPositionFinder = (appointmentTime) => {
    const minutes = dayjs(appointmentTime).format("m");
    const positionTopFactor = 100 / 60; //Each div contains 60 minutes, assuming 60 mins as top 100%, for one minute the top value should be 100/60 (i.e) 1.67
    return `${minutes * positionTopFactor}%`;
  };
  
  //function for finding the appointment height based on the duration
  const appointmentHeightFinder = (startTime, endTime) => {
    const appointmentDuration = dayjs(endTime).diff(dayjs(startTime), "minute");
    // if(appointmentDuration<=10) return appointmentDuration*2
    return appointmentDuration;
  };
  //function for finding the appointment width, so that if two or more appointments in the same interval will be sharing the space given to that
  const appointmentWidthFinder = (startTime) => {
    const formatTime = dayjs(startTime).format("h A");
    const appointmentsForTimePeriod = appointmentTimeIntervalFinder(formatTime);
    const minutes = dayjs(startTime).format("m");
    if (minutes <= 15) {
      const firstTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 15
      ).length;
      return 100 / firstTimePeriod;
    } else if (minutes > 15 && minutes <= 30) {
      const secondTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") > 15 &&
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 45
      ).length;
      return 100 / secondTimePeriod;
    } else if (minutes > 30 && minutes <= 45) {
      const thirdTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") > 30 &&
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 45
      ).length;
      return 100 / thirdTimePeriod;
    } else if (minutes > 45 && minutes <= 60) {
      const finalTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") > 45 &&
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 60
      ).length;

      return 100 / finalTimePeriod;
    }
  };
  //function for finding the left% of appointment
  //if two or more appointment overlaps, then the next appointment will be moved to right
  const appointmentLeftFinder = (startTime) => {
    const formatTime = dayjs(startTime).format("h A");
    const appointmentsForTimePeriod = appointmentTimeIntervalFinder(formatTime);
    const minutes = dayjs(startTime).format("m");
    if (minutes <= 15) {
      const firstTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 15
      ).length;
      const first = [];
      for (let i = 1; i <= firstTimePeriod; i++) {
        first.push((100 / firstTimePeriod) * (i - 1));
      }
      return first;
    } else if (minutes > 15 && minutes <= 30) {
      const secondTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") > 15 &&
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 45
      ).length;

      const second = [];
      for (let i = 1; i <= secondTimePeriod; i++) {
        second.push((100 / secondTimePeriod) * (i - 1));
      }
      return second;
    } else if (minutes > 30 && minutes <= 45) {
      const thirdTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") > 30 &&
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 45
      ).length;
      const third = [];
      for (let i = 1; i <= thirdTimePeriod; i++) {
        third.push((100 / thirdTimePeriod) * (i - 1));
      }
      return third;
    } else if (minutes > 45 && minutes <= 60) {
      const finalTimePeriod = appointmentsForTimePeriod.filter(
        (appointment) =>
          dayjs(appointment.startTime.substring(0, 19)).format("m") > 45 &&
          dayjs(appointment.startTime.substring(0, 19)).format("m") <= 60
      ).length;
      const final = [];
      for (let i = 1; i <= finalTimePeriod; i++) {
        final.push((100 / finalTimePeriod) * (i - 1));
      }
      return final;
    }
  };
  const fontSizeFinder = (startTime, endTime) => {
    const appointmentDuration = appointmentHeightFinder(startTime, endTime);
    if (appointmentDuration <= 10) return "12";
    else return "14";
  };

  return (
    <div className="timeline-view">
      {/* mapping each time in the array and returning appointments for each interval with the help of functions */}
      {time.map((time, index) => (
        <div
          className="appointment-period-container"
          key={index}
          onClick={() =>
            appointmentContext.dispatch({
              type: "CREATE_APPOINTMENT_MODAL",
              payload: true,
            })
          }
        >
          {dayjs(selectedDate).format("YYYY-MM-DD").toString()===dayjs().format("YYYY-MM-DD").toString()&& dayjs().format("h A").toString()===time&&<div style={{position: "absolute", top: `${appointmentPositionFinder(
                    dayjs().format("YYYY-MM-DDTHH:mm:ss")
                  )}`}} className="current-time-indicator"></div>}
          <div className="time">{time}</div>
          <div className="appointments">
            {appointmentTimeIntervalFinder(time)?.map((event, index) => (
              <div
                style={{
                  height: `${
                    appointmentHeightFinder(
                      event.startTime.substring(0, 19),
                      event.endTime.substring(0, 19)
                    ) * 1.32
                  }px`,
                  width: `${appointmentWidthFinder(
                    event.startTime.substring(0, 19)
                  )}%`,
                  minHeight: "15px",
                  position: "absolute",
                  top: `${appointmentPositionFinder(
                    event.startTime.substring(0, 19)
                  )}`,
                  left: `${
                    appointmentLeftFinder(event.startTime.substring(0, 19))[
                      index
                    ]
                  }%`,
                  fontSize: `${fontSizeFinder(
                    event.startTime.substring(0, 19),
                    event.endTime.substring(0, 19)
                  )}px`,
                }}
                className={`appointment`}
                key={index}
                onClick={(e) => {
                  appointmentDetailsHandler(event);
                  // appointmentIdHandler(event.id);
                  e.stopPropagation();
                }}
              >
                {event.title}
                {" " + dayjs(event.startTime.substring(0, 19)).format("h:mm A")}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;
