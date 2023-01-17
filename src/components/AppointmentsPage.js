import { useEffect, useState, useContext } from "react";
import "../styles/AppointmentsPage.scss";
import TimelineView from "./TimelineView";
import ViewToggleButton from "./ViewToggleButton";
import ListView from "./ListView";
import AppointmentDetails from "./AppointmentDetails";
import dayjs from "dayjs";
import { AppointmentContext } from "./Scheduler";
import MonthView from "./MonthView";
import Calendar from "./Calendar";
import WeekView from "./WeekView";
import MonthViewHeader from "./MonthViewHeader";
import AppointmentsList from "./AppointmentsList";
import DropdownButton from "./DropDownButton";
//Appointments page which contains appointments related data (center )
const AppointmentsPage = ({ selectedDate, selectDate }) => {
  const appointmentContext = useContext(AppointmentContext);
  //state to appointments for the selected date
  const [appointments, setAppointments] = useState([]);
  const [canShowListView, setCanShowListView] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  //state to store the id of the selected appointment
  const [appointmentId, setAppointmentId] = useState("");
  const [canShowDeleteModal, setCanShowDeleteModal] = useState(false);
  const [canShowUpdateModal, setCanShowUpdateModal] = useState(false);
  const [canShowAppointmentsList, setCanShowAppointmentsList] = useState(false);
  //state for storing today's date
  const [today, setToday] = useState(dayjs());
  //state for storing selected option (day or month view)
  const [option, setOption] = useState("Day");
  const handleToday = (date) => {
    setToday(date);
  };

  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);
  //for agenda view - under development
  const toggleListView = () => {
    setCanShowListView(true);
  };
  const toggleTimelineView = () => {
    setCanShowListView(false);
  };
  //function for updating id for viewing appointment details
  const appointmentIdHandler = (id) => {
    setAppointmentId(id);
  };
  //set appointments details to default state after closing the details page
  const defaultAppointmentState = () => {
    setAppointmentId("");
    setAppointmentDetails(null);
  };
  //function to update the delete appointment modal's state
  const handleDeleteAppointmentModal = (bool) => {
    setCanShowDeleteModal(bool);
  };
  //function to update the update appointment modal's state
  const handleUpdateAppointmentModal = (bool) => {
    setCanShowUpdateModal(bool);
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
    const startTime = selectedDate.startOf("date").toISOString();
    const endTime = selectedDate.endOf("date").toISOString();
    fetch(
      `http://localhost:5169/api/appointments?from=${startTime}&to=${endTime}&timeZoneOffset=${new Date().getTimezoneOffset()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      });
  }, [
    selectedDate,
    appointmentContext.state.isAppointmentCreated,
    appointmentContext.state.isAppointmentDeleted,
    appointmentContext.state.isAppointmentUpdated,
  ]);
  //Get appointment details for the particular appointment
  useEffect(() => {
    appointmentId &&
      setAppointmentDetails(
        canShowListView
          ? appointmentsForMonth.filter(
              (appointment) => appointment.id == appointmentId
            )
          : appointments.filter(
              (appointment) => appointment.id == appointmentId
            )
      );
  }, [appointmentId]);
  const [appointmentsForMonth, setAppointmentsForMonth] = useState([]);
  // const [month, setMonth] = useState(dayjs().toISOString());
  useEffect(() => {
    const startTime = today.startOf("month").toISOString();
    const endTime = today.endOf("month").toISOString();
    fetch(
      `http://localhost:5169/api/appointments?from=${startTime}&to=${endTime}&timeZoneOffset=${new Date().getTimezoneOffset()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAppointmentsForMonth(data);
      });
  }, [
    today,
    appointmentContext.state.isAppointmentCreated,
    appointmentContext.state.isAppointmentDeleted,
    appointmentContext.state.isAppointmentUpdated,
  ]);
  //function to render appointments for a day in month view
  const renderAppointments = (appointmentDate) => {
    const appointmentsForADate = appointmentsForMonth.filter(
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
                appointmentIdHandler(appointment.id);
              }}
            >
              {appointment.title}
            </div>
          ))}
        </div>
        <div
          onClick={() => setCanShowAppointmentsList(true)}
          className="show-all-appointments"
        >
          {appointmentsLength - 2} more
        </div>
        {canShowAppointmentsList && (
          <AppointmentsList
            appointments={appointmentsForADate}
            appointmentIdHandler={appointmentIdHandler}
            handleAppointmentsList={handleAppointmentsList}
          />
        )}
      </>
    ) : (
      <div className="appointments">
        {appointmentsForADate.map((appointment) => (
          <div onClick={() => appointmentIdHandler(appointment.id)}>
            {appointment.title}
          </div>
        ))}
      </div>
    );
  };

  console.log(appointmentDetails);
  return (
    <div className="appointments-page">
      <DropdownButton
        isFromAppointmentsPage={true}
        options={["Day", "Month"]}
        selectedOption={option}
        handleSelectedOption={handleChange}
      />
      {/* <ViewToggleButton canShowListView={canShowListView} toggleListView={toggleListView} toggleTimelineView={toggleTimelineView}/> */}
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
          <Calendar
            isFromMonthView={true}
            appointmentsForMonth={appointmentsForMonth}
            appointmentIdHandler={appointmentIdHandler}
            today={today}
            handleToday={handleToday}
            renderAppointments={renderAppointments}
          />
        ) : (
          // <ListView
          //   appointments={appointments}
          //   appointmentIdHandler={appointmentIdHandler}
          // />
          <TimelineView
            appointments={appointments}
            onClickAppointment={appointmentIdHandler}
            appointmentIdHandler={appointmentIdHandler}
          />
        )}
      </div>
      {appointmentDetails && (
        <AppointmentDetails
          appointment={appointmentDetails}
          closeAppointmentDetails={defaultAppointmentState}
          canShowDeleteModal={canShowDeleteModal}
          canShowUpdateModal={canShowUpdateModal}
          deleteAppointmentModal={handleDeleteAppointmentModal}
          updateAppointmentModal={handleUpdateAppointmentModal}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
