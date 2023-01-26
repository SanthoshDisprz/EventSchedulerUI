import "../../../styles/WeekView.scss";
import dayjs from "dayjs";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
//component for showing current week's dates above timeline
const WeekView = ({ selectedDate, selectDate }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="week-view">
      <GrFormPrevious
        onClick={() => selectDate(dayjs(selectedDate).subtract(7, "days"))}
        className="previous-week-icon"
        title="Previous Week"
      />
      {weekDays.map((day, index) => (
        <div
          className={`${
            dayjs(selectedDate).format("YYYY-MM-DD") ===
            dayjs(selectedDate)
              .startOf("week")
              .add(index, "day")
              .format("YYYY-MM-DD")
              ? `week-view-selected-date`
              : ""
          } ${
            dayjs(selectedDate).format("YYYY-MM-DD") ===
            dayjs().format("YYYY-MM-DD")
              ? `today-week-view`
              : ""
          } day-date-container`}
          key={index}
          onClick={() =>
            selectDate(dayjs(selectedDate).startOf("week").add(index, "day"))
          }
        >
          <div className="week-day">{day}</div>
          <div className="week-date">
            {dayjs(selectedDate).startOf("week").add(index, "day").date()}
          </div>
        </div>
      ))}
      <GrFormNext
        onClick={() => selectDate(dayjs(selectedDate).add(7, "days"))}
        className="next-week-icon"
        title="Next Week"
      />
    </div>
  );
};

export default WeekView;
