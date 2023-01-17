import dayjs from "dayjs";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { months } from "../utils/CalendarDateGenerator";
import "../styles/MonthViewHeader.scss";
const MonthViewHeader = ({today, handleToday}) => {
    // console.log(today)
    const currentDate = dayjs();
    //state for storing today's date
    // const [today, setToday] = useState(currentDate);
    return (  <div className="month-calendar-header">
    <div className="month-year-container">
    {months[dayjs(today).month()]} {dayjs(today).year()}
    </div>
    <div className="navigation-icons-container">
      <GrFormPrevious
        className="previous-month-navigator-icon"
        title="Previous Month"
        onClick={() => {
          handleToday(dayjs(today).month(dayjs(today).month() - 1));
        }}
      />
      <div
            className="today-icon"
            onClick={() => {
              handleToday(currentDate);
            }}
          >
            Today
          </div>
  
      <GrFormNext
        className="next-month-navigator-icon"
        title="Next Month"
        onClick={() => {
          handleToday(dayjs(today).month(dayjs(today).month() + 1));
        }}
      />
    </div>
  </div> );
}
 
export default MonthViewHeader;