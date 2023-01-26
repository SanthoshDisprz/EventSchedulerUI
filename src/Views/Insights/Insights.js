import StatBox from "./StatBox";
import "../../styles/Insights.scss";
import Calendar from "../../assets/statBoxIcons/Calendar.svg";
import Time from "../../assets/statBoxIcons/Time.svg";
import Average from "../../assets/statBoxIcons/Average.svg";
import RemainingMeetings from "../../assets/statBoxIcons/Remaining.svg";
//insights data about current week, month, year
const Insights = ({
  totalHours,
  noOfAppointments,
  averageTime,
  remainingAppointments,
}) => {
  return (
    <div className="insights">
      <StatBox icon={Calendar} title="Meetings" data={noOfAppointments} />
      <StatBox
        icon={RemainingMeetings}
        title="Remaining"
        data={remainingAppointments}
      />
      <StatBox icon={Time} title="Time" data={`${totalHours} hrs`} />
      <StatBox icon={Average} title="Average" data={`${averageTime} hrs`} />
    </div>
  );
};

export default Insights;
