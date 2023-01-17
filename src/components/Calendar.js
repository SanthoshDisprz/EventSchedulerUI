import "../styles/Calendar.scss";
import { generateDate, months } from "../utils/CalendarDateGenerator";
import dayjs from "dayjs";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
//calendar component
const Calendar = ({
  selectedDate,
  selectDate,
  isFromMonthView,
  today,
  handleToday,
  renderAppointments,
}) => {
  //days of the week
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  //get current date
  const currentDate = dayjs();

  return (
    <div
      className={`calendar-container ${isFromMonthView ? `month-view` : ""}`}
    >
      <div className="calendar-header-container">
        <div className="month-year-container">
          {months[today.month()]} {today.year()}
        </div>
        <div className="navigation-icons-container">
          <GrFormPrevious
            className="previous-month-navigator-icon"
            title="Previous Month"
            onClick={() => {
              handleToday(today.month(today.month() - 1));
            }}
          />
          <div
            className="today-icon"
            onClick={() => {
              handleToday(currentDate);
              selectDate(currentDate);
            }}
          >
            Today
          </div>
          <GrFormNext
            className="next-month-navigator-icon"
            title="Next Month"
            onClick={() => {
              handleToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <div className="days-container">
        {days.map((day, index) => {
          return (
            <div key={index} className="day">
              {day}
            </div>
          );
        })}
      </div>

      <div className=" dates-container ">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div key={index} className="date-container">
                <div
                  className={`${currentMonth ? "" : "current-month"}
                    ${today ? "today" : ""}
                    ${
                      selectedDate &&
                      selectedDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "selected-date"
                        : ""
                    }
                    date`}
                  onClick={() => {
                    !isFromMonthView && selectDate(date);
                  }}
                >
                  {date.date()}
                  {/* {console.log(appointmentsForMonth)} */}
                  {/* {appointmentsForMonth && appointmentsForMonth.filter(appointment=>dayjs(appointment.startTime).format("YYYY-MM-DD")==date.format("YYYY-MM-DD")).map(appointment=><div>{appointment.title}</div>)} */}
                </div>
                {isFromMonthView && renderAppointments(date)}
                {/* {isFromMonthView && <div>{appointmentsForMonth && appointmentsForMonth.filter(appointment=>dayjs(appointment.startTime).format("YYYY-MM-DD")==date.format("YYYY-MM-DD")).map(appointment=><div>{appointment.title}</div>)}</div>} */}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calendar;
