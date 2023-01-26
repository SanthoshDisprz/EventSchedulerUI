import dayjs from "dayjs";
import { createContext, useEffect, useReducer, useState } from "react";
import AppointmentsPage from "./Appointments/AppointmentsPage";
import Calendar from "../components/Calendar";
import CreateAppointment from "../components/CreateAppointmentButton";
import AlertBox from "../components/AlertBox";
import CreateAppointmentModal from "./Modals/CreateAppointmentModal";
import Weather from "./Weather/Weather";
import Analytics from "./Insights/Analytics";
import SearchResults from "./Search Appointments/SearchResults";
import AppointmentDetails from "./Modals/AppointmentDetails";
import axios from "axios";
import {initialState, reducer} from "../reducer/AppointmentReducer"
export const AppointmentContext = createContext({});
export const AlertContext = createContext({});
//global component which is having main components and global states
const Scheduler = ({
  canShowSearchResults,
  searchTitle,
  handleSearchResults,
}) => {

  const [appointmentState, dispatchAppointment] = useReducer(
    reducer,
    initialState
  );
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [alert, setAlert] = useState({
    canShowAlert: false,
    alertMessage: "",
    alertType: "",
  });
  const [searchResults, setSearchResults] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [canShowDeleteModal, setCanShowDeleteModal] = useState(false);
  const [canShowUpdateModal, setCanShowUpdateModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const handlePageNumber = (type) => {
    switch (type) {
      case "nextPage":
        setCurrentPage(currentPage + 1);
        break;
      case "previousPage":
        setCurrentPage(currentPage - 1);
        break;
    }
  };
  //set appointments details to default state after closing the details page
  const defaultAppointmentState = () => {
    // setAppointmentId("");
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
  const handleAppointmentDetails = (appointment) => {
    setAppointmentDetails(appointment);
  };

  //function to update alert box
  const handleAlert = (bool, alertMessage, alertType) => {
    setAlert({
      canShowAlert: bool,
      alertMessage: alertMessage,
      alertType: alertType,
    });
  };
  //function to update selected date
  const selectDate = (date) => {
    setSelectedDate(date);
  };
  //state for storing today's date
  const [today, setToday] = useState(dayjs());
  const handleToday = (date) => {
    setToday(date);
  };

  //api call for search
  useEffect(() => {
    if (searchTitle.replace(/\s/g, "") === "") return;
    const searchAppointments = async () => {
      const response = await axios.get(
        `http://localhost:5169/api/appointments/search?title=${searchTitle}&pageNumber=${currentPage}&pageSize=5&timeZoneOffset=${new Date().getTimezoneOffset()}`
      );
      setSearchResults(response.data);
    };
    searchAppointments();
  }, [
    handleSearchResults,
    currentPage,
    appointmentState.isAppointmentCreated,
    appointmentState.isAppointmentDeleted,
    appointmentState.isAppointmentUpdated,
  ]);

  //to display alert box for 4 seconds
  useEffect(() => {
    alert.canShowAlert &&
      setTimeout(() => {
        const alertTimeOut = setAlert({ ...alert, canShowAlert: false });
        clearTimeout(alertTimeOut);
      }, 4000);
  }, [alert.canShowAlert]);
  return (
    <AppointmentContext.Provider
      value={{ state: appointmentState, dispatch: dispatchAppointment }}
    >
      <AlertContext.Provider value={{ alert, handleAlert }}>
        {alert.canShowAlert && (
          <AlertBox
            alertType={alert.alertType}
            alertMessage={alert.alertMessage}
          />
        )}
        <Calendar
          selectDate={selectDate}
          selectedDate={selectedDate}
          today={today}
          handleToday={handleToday}
        />
        {appointmentState.canShowCreateAppointmentModal && (
          <CreateAppointmentModal selectedDate={selectedDate} />
        )}
        <CreateAppointment />
        <Weather />
        <AppointmentsPage
          selectedDate={selectedDate}
          selectDate={selectDate}
          handleAppointmentDetails={handleAppointmentDetails}
        />
        {canShowSearchResults ? (
          <SearchResults
            appointments={searchResults}
            handlePageNumber={handlePageNumber}
            handleSearchResults={handleSearchResults}
            handleAppointmentDetails={handleAppointmentDetails}
            currentPage={currentPage}
          />
        ) : (
          <Analytics />
        )}
        {appointmentDetails && (
          <AppointmentDetails
            appointmentDetails={appointmentDetails}
            closeAppointmentDetails={defaultAppointmentState}
            canShowDeleteModal={canShowDeleteModal}
            canShowUpdateModal={canShowUpdateModal}
            deleteAppointmentModal={handleDeleteAppointmentModal}
            updateAppointmentModal={handleUpdateAppointmentModal}
          />
        )}
      </AlertContext.Provider>
    </AppointmentContext.Provider>
  );
};

export default Scheduler;
