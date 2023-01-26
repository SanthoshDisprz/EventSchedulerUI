import { useEffect, useState, useContext } from "react";
import "../../styles/AppointmentsPage.scss";
import TimelineView from "./Day View/TimelineView";
import dayjs from "dayjs";
import { AppointmentContext } from "../../Views/Scheduler/Scheduler";
import { default as MonthView } from "../../components/Calendar";
import WeekView from "../Appointments/Day View/WeekView";
import MonthViewHeader from "./Month View/MonthViewHeader";
import AppointmentsList from "./Month View/AppointmentsList";
import DropdownButton from "../../components/DropDownButton";
import axios from "axios";
//Appointments page which contains appointments related data (center )
const AppointmentsPage = ({ selectedDate, selectDate, handleAppointmentDetails }) => {
  const appointmentContext = useContext(AppointmentContext);
  //state to appointments for the selected date
  const [appointments, setAppointments] = useState([]);
  const [canShowAppointmentsList, setCanShowAppointmentsList] = useState({});
  const handleClick = (id) => {
    setCanShowAppointmentsList(open => ({
      ...open,
      [id]: !open[id],
    }));
  }
  //state for storing today's date
  const [today, setToday] = useState(dayjs());
  //state for storing selected option (day or month view)
  const [option, setOption] = useState("Day");
  const handleToday = (date) => {
    setToday(date);
  };


  const handleAppointmentsList = () => {
    setCanShowAppointmentsList(false);
  };
  //function for updating the selected option
  const handleChange = (option) => {
    setOption(option);
  };


  //get appointments by date
  useEffect(() => {
    const getAppointmentsForDate = async () => {
      const startTime = selectedDate.startOf("date").toISOString();
      const endTime = selectedDate.endOf("date").toISOString();
      const response = await axios.get(
        `http://localhost:5169/api/appointments?from=${startTime}&to=${endTime}&timeZoneOffset=${new Date().getTimezoneOffset()}`
      )
      setAppointments(response.data);
    }
    getAppointmentsForDate();
  }, [
    selectedDate,
    appointmentContext.state.isAppointmentCreated,
    appointmentContext.state.isAppointmentDeleted,
    appointmentContext.state.isAppointmentUpdated,
  ]);
  const [appointmentsForMonth, setAppointmentsForMonth] = useState([]);
  useEffect(() => {
    const getAppointmentsForMonth = async () => {
      const startTime = today.startOf("month").toISOString();
      const endTime = today.endOf("month").toISOString();
      const response = await axios.get(
        `http://localhost:5169/api/appointments?from=${startTime}&to=${endTime}&timeZoneOffset=${new Date().getTimezoneOffset()}`
      )
      setAppointmentsForMonth(response.data);
    }
    getAppointmentsForMonth();
  }, [
    today,
    appointmentContext.state.isAppointmentCreated,
    appointmentContext.state.isAppointmentDeleted,
    appointmentContext.state.isAppointmentUpdated,
  ]);
  //function to render appointments for a day in month view
  const renderAppointments = (appointmentDate) => {
    const appointmentsForADate = appointmentsForMonth?.filter(
      (appointment) =>
        dayjs(appointment.startTime.substring(0, 19)).format("YYYY-MM-DD") ==
        appointmentDate.format("YYYY-MM-DD")
    );
    const appointmentsLength = appointmentsForADate.length;
    return appointmentsLength > 2 ? (
      <>
        <div className="appointments">
          {appointmentsForADate.slice(0, 2).map((appointment) => (
            <div
              onClick={() => {
                handleAppointmentDetails(appointment);
              }}
            >
              {appointment.title}
            </div>
          ))}
        </div>
        <div
          onClick={() => handleClick(appointmentsForADate[0].startTime)}
          className="show-all-appointments"
        >
          {appointmentsLength - 2} more
        </div>
        {canShowAppointmentsList[appointmentsForADate[0].startTime] && (
          <AppointmentsList
            appointmentDetailsHandler={handleAppointmentDetails}
            appointments={appointmentsForADate}
            handleAppointmentsList={handleAppointmentsList}
          />
        )}
      </>
    ) : (
      <div className="appointments">
        {appointmentsForADate.map((appointment) => (
          <div onClick={() => handleAppointmentDetails(appointment)}>
            {appointment.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="appointments-page">
      <DropdownButton
        isFromAppointmentsPage={true}
        options={["Day", "Month"]}
        selectedOption={option}
        handleSelectedOption={handleChange}
      />
      {option == "Month" ? (
        <MonthViewHeader
          today={today}
          handleToday={handleToday}
          isFromMonthView={true}
        />
      ) : (
        <WeekView selectDate={selectDate} selectedDate={selectedDate} />
      )}
      <div className="appointments-list">
        {option == "Month" ? (
          <MonthView
            isFromMonthView={true}
            appointmentsForMonth={appointmentsForMonth}
            today={today}
            handleToday={handleToday}
            renderAppointments={renderAppointments}
          />
        ) : (
          <TimelineView
            appointments={appointments}
            appointmentDetailsHandler={handleAppointmentDetails}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
