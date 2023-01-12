import "../styles/Calendar.scss";
import { generateDate, months } from "../utils/CalendarDateGenerator";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
//calendar component
const Calendar = ({ selectedDate, selectDate }) => {
  //days if the week
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  //get current date
  const currentDate = dayjs();
  //state for storing today;s date
  const [today, setToday] = useState(currentDate);

  return (
    <div className="calendar-container">
      <div className="calendar-header-container">
        <div className="month-year-container">
          {months[today.month()]} {today.year()}
        </div>
        <div className="navigation-icons-container">
          <GrFormPrevious
            className="previous-month-navigator-icon"
            title="Previous Month"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <div
            className="today-icon"
            onClick={() => {
              setToday(currentDate);
              selectDate(currentDate);
            }}
          >
            Today
          </div>
          <GrFormNext
            className="next-month-navigator-icon"
            title="Next Month"
            onClick={() => {
              setToday(today.month(today.month() + 1));
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
                      selectedDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                        ? "selected-date"
                        : ""
                    }
                    date`}
                  onClick={() => {
                    selectDate(date);
                  }}
                >
                  {date.date()}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calendar;
