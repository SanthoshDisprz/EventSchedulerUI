import dayjs from "dayjs";
import { createContext, useEffect, useReducer, useState } from "react";
import AppointmentsPage from "./AppointmentsPage";
import Calendar from "./Calendar";
import CreateAppointment from "./CreateAppointmentButton";
import AlertBox from "./AlertBox";
import CreateAppointmentModal from "./CreateAppointmentModal";
import WeekView from "./WeekView"
import Weather from "./Weather"
import Analytics from "./Analytics";
export const AppointmentContext = createContext({});
export const AlertContext = createContext({});
//global component which is having main components and global states
const Scheduler = () => {
  //Appointments Initial States
  const initialState = {
    isAppointmentCreated: false,
    canShowCreateAppointmentModal: false,
    isAppointmentDeleted: false,
    isAppointmentUpdated: false,
    canShowUpdateAppointmentModal: false,
  };
  //Reducer function to update the appointment's state
  const reducer = (state, action) => {
    switch (action.type) {
      case "CREATE_APPOINTMENT":
        return { ...state, isAppointmentCreated: !state.isAppointmentCreated };
      case "CREATE_APPOINTMENT_MODAL":
        return { ...state, canShowCreateAppointmentModal: action.payload };
      case "DELETE_APPOINTMENT":
        return { ...state, isAppointmentDeleted: !state.isAppointmentDeleted };
      case "UPDATE_APPOINTMENT":
        return { ...state, isAppointmentUpdated: !state.isAppointmentUpdated };
      default:
        return state;
    }
  };
  const [appointmentState, dispatchAppointment] = useReducer(reducer, initialState);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [alert, setAlert] = useState({
    canShowAlert: false,
    alertMessage: "",
    alertType: "",
  });

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
  const handleToday=(date)=>{
    setToday(date)
  }

  //to display alert box for 4 seconds
  useEffect(() => {
    alert.canShowAlert &&
      setTimeout(() => {
        const alertTimeOut = setAlert({ ...alert, canShowAlert: false });
        clearTimeout(alertTimeOut);
      }, 4000);
  }, [alert.canShowAlert]);
  return (
    <AppointmentContext.Provider value={{ state: appointmentState, dispatch: dispatchAppointment }}>
      <AlertContext.Provider value={{ alert, handleAlert }}>
        {alert.canShowAlert && (
          <AlertBox
            alertType={alert.alertType}
            alertMessage={alert.alertMessage}
          />
        )}
        <Calendar selectDate={selectDate} selectedDate={selectedDate} today={today} handleToday={handleToday}/>
        {appointmentState.canShowCreateAppointmentModal && <CreateAppointmentModal />}
        <CreateAppointment />
        {/* <WeekView selectDate={selectDate} selectedDate={selectedDate}/> */}
        <Weather />
        <AppointmentsPage selectedDate={selectedDate} selectDate={selectDate}/>
        <Analytics />
      </AlertContext.Provider>
    </AppointmentContext.Provider>
  );
};

export default Scheduler;
