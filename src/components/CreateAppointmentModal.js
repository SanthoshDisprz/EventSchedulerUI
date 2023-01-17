import "../styles/CreateAppointmentModal.scss";
import { React, useContext, useState } from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import { BsHourglassTop, BsHourglassBottom } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import GuestsList from "./GuestsList";
import GuestsListInput from "./GuestsListInput";
import { AlertContext, AppointmentContext } from "./Scheduler";
import axios from "axios";
//create appointment modal
const CreateAppointmentModal = () => {
  const alertContext = useContext(AlertContext);
  const appointmentContext = useContext(AppointmentContext);
  //state to store the appointment details while creating appointment
  const [appointment, setAppointment] = useState({
    title: "",
    startTime: dayjs().add(10, "minutes").format("YYYY-MM-DDTHH:mm"),
    endTime: dayjs()
      .add(10, "minutes")
      .add(1, "hour")
      .format("YYYY-MM-DDTHH:mm"),
    timeZoneOffset: new Date().getTimezoneOffset(),
    description: "",
    createdBy: "santhosh.t@disprz.com",
    guestsList: [],
    location: "",
  });
  //state updating functions for handling
  const appointmentTitleInputHandler = (event) => {
    setAppointment({ ...appointment, title: event.target.value });
  };
  const appointmentStartTimeInputHandler = (event) => {
    setAppointment({
      ...appointment,
      startTime: dayjs(event.target.value).toISOString(),
    });
  };
  const appointmentEndTimeInputHandler = (event) => {
    setAppointment({
      ...appointment,
      endTime: dayjs(event.target.value).toISOString(),
    });
  };
  const appointmentDescriptionInputHandler = (event) => {
    setAppointment({
      ...appointment,
      description: event.target.value,
    });
  };
  const appointmentGuestsHandler = (guest) => {
    setAppointment({
      ...appointment,
      guestsList: [guest, ...appointment.guestsList],
    });
  };
  const appointmentLocationHandler = (event) => {
    setAppointment({
      ...appointment,
      location: event.target.value,
    });
  };

  const deleteGuestHandler = (key) => {
    setAppointment({
      ...appointment,
      guestsList: appointment.guestsList.filter(
        (guest, index) => index !== key
      ),
    });
  };
  const appointmentsInISOString = {
    ...appointment,
    startTime: dayjs(appointment.startTime).toISOString(),
    endTime: dayjs(appointment.endTime).toISOString(),
  };

  //function for creating the appointment
  const submitHandler = async (event) => {
    event.preventDefault();
    if (appointment.title.replace(/\s/g, "") === "") return;
    try {
      const response = await axios.post(
        "http://localhost:5169/api/appointments",
        appointmentsInISOString
      );
      if (response.data == true) {
        appointmentContext.dispatch({
          type: "CREATE_APPOINTMENT_MODAL",
          payload: false,
        });
        appointmentContext.dispatch({
          type: "CREATE_APPOINTMENT",
        });
        alertContext.handleAlert(true, "Appointment Created", "Success");
      }
    } catch (err) {
      if (err.response.data.statusCode === 409) {
        alertContext.handleAlert(true, "Conflict Occured", "Error");
      } else
        alertContext.handleAlert(true, err.response.data.errorMessage, "Error");
    }
  };
  return ReactDOM.createPortal(
    <div
      className="modal-background"
      onClick={() =>
        appointmentContext.dispatch({
          type: "CREATE_APPOINTMENT_MODAL",
          payload: false,
        })
      }
    >
      <form
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        // onKeyUp={(e)=>e.key=="Enter"&&e.preventDefault()}
      >
        <div className="create-appointment-header">
          <div className="create-appointment-heading">
            Create an Appointment
          </div>
          <MdOutlineClose
            className="close-button"
            title="Close"
            onClick={() => {
              appointmentContext.dispatch({
                type: "CREATE_APPOINTMENT_MODAL",
                payload: false,
              });
              // createAppointmentContext.createAppointmentModalHandler(false);
            }}
          />
        </div>

        <div className="appointment-details">
          <input
            type="text"
            onChange={appointmentTitleInputHandler}
            value={appointment.title}
            placeholder="Title"
            className="appointment-title"
            autoFocus
            required
            spellCheck="false"
          />
          <div className="appointment-period-container">
            <div className="icon-label-container">
              <BsHourglassTop />
              <label>Starts at</label>
            </div>
            <input
              type="datetime-local"
              format="MM-DD-YYYY hh:mm"
              value={dayjs(appointment.startTime).format("YYYY-MM-DDTHH:mm")}
              onChange={appointmentStartTimeInputHandler}
              required
            />
          </div>
          <div className="appointment-period-container">
            <div className="icon-label-container">
              <BsHourglassBottom />
              <label>Ends at</label>
            </div>
            <input
              type="datetime-local"
              format="MM-DD-YYYY hh:mm"
              value={dayjs(appointment.endTime).format("YYYY-MM-DDTHH:mm")}
              onChange={appointmentEndTimeInputHandler}
              required
            />
          </div>
          <GuestsListInput onAddGuest={appointmentGuestsHandler} />
          {/* {renderGuestList()} */}
          <GuestsList
            guestsList={appointment.guestsList}
            deleteGuestHandler={deleteGuestHandler}
          />
          <input
            type="text"
            placeholder="Location"
            value={appointment.location}
            onChange={appointmentLocationHandler}
            className="appointment-location"
            spellCheck="false"
          />
          <TextareaAutosize
            maxRows={2}
            placeholder="Description"
            onChange={appointmentDescriptionInputHandler}
            value={appointment.description}
            className="description"
            spellCheck="false"
          ></TextareaAutosize>
        </div>
        <div className="modal-button-container">
          <button
            type="button"
            onClick={() => {
              appointmentContext.dispatch({
                type: "CREATE_APPOINTMENT_MODAL",
                payload: false,
              });
              // createAppointmentContext.createAppointmentModalHandler(false);
            }}
            id="cancel-button"
          >
            Cancel
          </button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  );
};

export default CreateAppointmentModal;
