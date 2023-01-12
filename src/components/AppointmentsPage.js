import { useEffect, useState, useContext } from "react";
import "../styles/AppointmentsPage.scss";
import TimelineView from "./TimelineView";
import ViewToggleButton from "./ViewToggleButton";
import ListView from "./ListView";
import AppointmentDetails from "./AppointmentDetails";
import dayjs from "dayjs";
import { AppointmentContext } from "./Scheduler";
//Appointments page which contains appointments related data (center )
const AppointmentsPage = ({ selectedDate }) => {
  const appointmentContext = useContext(AppointmentContext);
  //state to appointments for the selected date
  const [appointments, setAppointments] = useState([]);
  const [canShowListView, setCanShowListView] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  //state to store the id of the selected appointment
  const [appointmentId, setAppointmentId] = useState("");
  const [canShowDeleteModal, setCanShowDeleteModal] = useState(false);
  const [canShowUpdateModal, setCanShowUpdateModal] = useState(false);
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
  //get appointments by date
  useEffect(() => {
    // const isoString = dayjs(selectedDate).toISOString();
    // const utcTime = dayjs(selectedDate).toISOString();
    const utcTime = selectedDate.format("YYYY-MM-DD") + "T00:00:00Z";
    fetch(
      `http://localhost:5169/api/appointments?date=${utcTime}&timeZoneOffset=${new Date().getTimezoneOffset()}`
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
        appointments.filter((appointment) => appointment.id == appointmentId)
      );
  }, [appointmentId]);

  return (
    <div className="appointments-page">
      {/* <ViewToggleButton canShowListView={canShowListView} toggleListView={toggleListView} toggleTimelineView={toggleTimelineView}/> */}
      <div className="appointments-list">
        {canShowListView ? (
          <ListView
            appointments={appointments}
            appointmentIdHandler={appointmentIdHandler}
          />
        ) : (
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
