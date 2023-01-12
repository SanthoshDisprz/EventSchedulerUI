import "../styles/CreateAppointmentModal.scss";
import { React, useContext, useState } from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import { BsHourglassTop, BsHourglassBottom } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import GuestsList from "./GuestsList";
import GuestsListInput from "./GuestsListInput";
import TextareaAutosize from "react-textarea-autosize";
import { AlertContext, AppointmentContext } from "./Scheduler";
//component for update modal
const UpdateAppointmentModal = ({
  appointmentDetails,
  closeAppointmentDetails,
  updateAppointmentModal,
}) => {
  const appointmentContext = useContext(AppointmentContext);
  const alertContext = useContext(AlertContext);

  //state for storing update appointment details, initial state set to appointment details
  const [appointment, setAppointment] = useState({
    title: appointmentDetails.title,
    startTime: appointmentDetails.startTime.substring(0, 19),
    endTime: appointmentDetails.endTime.substring(0, 19),
    description: appointmentDetails.description,
    createdBy: appointmentDetails.createdBy,
    guestsList: appointmentDetails.guestsList,
    location: appointmentDetails.location,
    timeZoneOffset: new Date().getTimezoneOffset(),
  });

  const appointmentTitleInputHandler = (event) => {
    setAppointment({ ...appointment, title: event.target.value });
  };
  const appointmentStartTimeInputHandler = (event) => {
    const eventStartTime = event.target.value;
    const eventDate = dayjs(eventStartTime).format("YYYY-MM-DD");
    setAppointment({
      ...appointment,
      date: eventDate,
      startTime: eventStartTime,
    });
  };
  const appointmentEndTimeInputHandler = (event) => {
    const eventEndTime = event.target.value;
    setAppointment({ ...appointment, endTime: eventEndTime });
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
  //function to delete the guest while updating appointment
  const deleteGuestHandler = (key) => {
    setAppointment({
      ...appointment,
      guestsList: appointment.guestsList.filter((guest, index) => index != key),
    });
  };
  const appointmentsInISOString = {
    ...appointment,
    startTime: dayjs(appointment.startTime).toISOString(),
    endTime: dayjs(appointment.endTime).toISOString(),
  };
  //function for updating the appointment
  const submitHandler = async (event) => {
    event.preventDefault();
    if (appointment.title.replace(/\s/g, "") === "") return;
    try {
      await fetch(
        `http://localhost:5169/api/appointments/${appointmentDetails.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentsInISOString),
        }
      ).then((res) => {
        if (res.status === 200) {
          appointmentContext.dispatch({
            type: "UPDATE_APPOINTMENT",
          });
          updateAppointmentModal(false);
          closeAppointmentDetails();
          alertContext.handleAlert(true, "Appointment Updated", "Success");
        } else if (res.status === 409) {
          alertContext.handleAlert(true, "Conflict Occured", "Error");
        } else {
          alertContext.handleAlert(true, "Error", "Error");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="modal-background"
      onClick={() => updateAppointmentModal(false)}
    >
      <form
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
      >
        <div className="create-appointment-header">
          <div className="create-appointment-heading">
            Update an Appointment
          </div>
          <MdOutlineClose
            className="close-button"
            title="Close"
            onClick={() => {
              updateAppointmentModal(false);
            }}
          />

          {/* </div> */}
        </div>

        <div className="appointment-details">
          <input
            type="text"
            onChange={appointmentTitleInputHandler}
            value={appointment.title}
            spellCheck="false"
            placeholder="Title"
            className="appointment-title"
            autoFocus
            required
          />
          {/* <input type="date" onChange={appointmentDateInputHandler} value={appointment.appointmentDate} /> */}
          <div className="appointment-period-container">
            <div className="icon-label-container">
              <BsHourglassTop />
              <label>Starts at</label>
            </div>
            <input
              type="datetime-local"
              format="MM-DD-YYYY hh:mm"
              value={appointment.startTime}
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
              value={appointment.endTime}
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
            onClick={() => {
              updateAppointmentModal(false);
            }}
            id="cancel-button"
          >
            Cancel
          </button>
          <button>Update</button>
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  );
};

export default UpdateAppointmentModal;
