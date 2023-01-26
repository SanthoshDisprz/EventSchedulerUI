import "../../styles/AppointmentDetails.scss";
import { MdOutlineEdit, MdDeleteOutline, MdOutlineClose } from "react-icons/md";
import dayjs from "dayjs";
import ReactDOM from "react-dom";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import { BsCalendarCheck } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { TbFileDescription } from "react-icons/tb";
import { SlPeople, SlLocationPin } from "react-icons/sl";
//appointment details modal which will open when the appointment is clicked
const AppointmentDetails = ({
  appointmentDetails,
  closeAppointmentDetails,
  canShowDeleteModal,
  canShowUpdateModal,
  deleteAppointmentModal,
  updateAppointmentModal,
}) => {
  //selected appointment
  // const appointmentDetails = appointment;
  const currentDateTime = new Date();
  const appointmentStartDateTime = dayjs(
    appointmentDetails.startTime?.substring(0, 19)
  );
  //function for dynamically update the modal's height based on the content inside in it
  const modalHeightFinder = () => {
    if (
      appointmentDetails.guestsList?.length > 0 &&
      (appointmentDetails.location !== "" ||
        appointmentDetails.description !== "")
    )
      return "55%";
    else if (appointmentDetails.description?.length > 20) return "45%";
    else if (
      appointmentDetails.guestsList?.length == 0 &&
      appointmentDetails.location == "" &&
      appointmentDetails.description == ""
    )
      return "30%";
    else if (
      appointmentDetails.guestsList?.length == 0 &&
      (appointmentDetails.location == "" ||
        appointmentDetails.description == "")
    )
      return "33%";
    else return "35%";
  };
  return ReactDOM.createPortal(
    <>
      {canShowDeleteModal && (
        <DeleteAppointmentModal
          id={appointmentDetails.id}
          onDelete={deleteAppointmentModal}
          closeAppointmentDetails={closeAppointmentDetails}
        />
      )}
      {canShowUpdateModal && (
        <UpdateAppointmentModal
          appointmentDetails={appointmentDetails}
          closeAppointmentDetails={closeAppointmentDetails}
          updateAppointmentModal={updateAppointmentModal}
        />
      )}
      <div
        className="appointment-background"
        onClick={() => closeAppointmentDetails()}
      >
        <div
          className="appointment"
          onClick={(event) => event.stopPropagation()}
          style={{ height: `${modalHeightFinder()}` }}
        >
          <div className="appointment-details-header">
          <div className="appointment-details-title">Appointment Details</div>
          <div className="options">
            {currentDateTime < appointmentStartDateTime && (
              <>
                <MdOutlineEdit
                  title="Edit"
                  className="edit-icon"
                  onClick={() => updateAppointmentModal(true)}
                />
                <MdDeleteOutline
                  title="Delete"
                  className="delete-icon"
                  onClick={() => deleteAppointmentModal(true)}
                />
              </>
            )}
            <MdOutlineClose
              title="Close"
              className="close-icon"
              onClick={() => closeAppointmentDetails()}
            />
          </div>
          </div>
          <div className="appointment-details">
            <div className="appointment-title">{appointmentDetails.title}</div>
            <div className="appointment-date">
              <BsCalendarCheck className="appointment-details-icon" />

              {dayjs(appointmentDetails.startTime?.substring(0, 19)).format(
                "dddd"
              ) +
                ", " +
                dayjs(appointmentDetails.startTime?.substring(0, 19)).format(
                  "MMMM"
                ) +
                " " +
                dayjs(appointmentDetails.startTime?.substring(0, 19)).format(
                  "D"
                )}
            </div>
            <div className="appointment-time">
              <BiTimeFive className="appointment-details-icon" />
              {dayjs(appointmentDetails.startTime?.substring(0, 19)).format(
                "h:mm A"
              )}{" "}
              -
              {dayjs(appointmentDetails.endTime?.substring(0, 19)).format(
                "h:mm A"
              )}
            </div>

            {appointmentDetails.guestsList?.length > 0 && (
              <div className="appointment-guests">
                <SlPeople className="appointment-details-icon" />
                <div className="organizer-guests-container">
                  <div className="guest">
                    <div className="guest-profile-picture">{appointmentDetails?.createdBy[0].toUpperCase()}</div>
                    <div>{appointmentDetails?.createdBy} (Organizer)</div>
                  </div>
                  {appointmentDetails.guestsList?.map((guest) => (
                    <div className="guest-mail-addresses"><div className="guest-profile-picture">{guest[0].toUpperCase()}</div><div>{guest}</div></div>
                  ))}
                </div>
              </div>
            )}
            {appointmentDetails.location && (
              <div className="appointment-location">
                <SlLocationPin className="appointment-details-icon" />
                {appointmentDetails?.location}
              </div>
            )}
            {appointmentDetails.description && (
              <div className="appointment-description">
                <TbFileDescription className="appointment-details-icon" />
                <pre className="description">
                  {appointmentDetails?.description}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AppointmentDetails;
