import Appointment from "./Appointment";
//list (agenda) view- under development
const ListView = ({ appointments, onDeleteAppointment, appointmentIdHandler }) => {
  return appointments.map((appointment, index) => (
    <Appointment
      id={appointment.id}
      title={appointment.title}
      startTime={appointment.startTime}
      endTime={appointment.endTime}
      description={appointment.description}
      onDelete={onDeleteAppointment}
      key={index}
      appointmentIdHandler={appointmentIdHandler}
    />
  ));
};

export default ListView;
