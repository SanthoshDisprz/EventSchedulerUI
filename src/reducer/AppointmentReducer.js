  //Appointments Initial States
  export const initialState = {
    isAppointmentCreated: false,
    canShowCreateAppointmentModal: false,
    isAppointmentDeleted: false,
    isAppointmentUpdated: false,
    canShowUpdateAppointmentModal: false,
    appointmentData: {},
  };
  //Reducer function to update the appointment's state
  export const reducer = (state, action) => {
    switch (action.type) {
      case "CREATE_APPOINTMENT":
        return { ...state, isAppointmentCreated: !state.isAppointmentCreated };
      case "CREATE_APPOINTMENT_MODAL":
        return { ...state, canShowCreateAppointmentModal: action.payload };
      case "DELETE_APPOINTMENT":
        return { ...state, isAppointmentDeleted: !state.isAppointmentDeleted };
      case "UPDATE_APPOINTMENT":
        return { ...state, isAppointmentUpdated: !state.isAppointmentUpdated };
      case "ADD_APPOINTMENT_DATA":
        return { ...state, appointmentData: action.payload };
      default:
        return state;
    }
  };