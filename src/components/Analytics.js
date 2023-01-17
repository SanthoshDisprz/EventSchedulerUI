import { useContext, useEffect, useMemo, useState } from "react";
import Chart from "./Chart";
import DropDownButton from "./DropDownButton";
import Insights from "./Insights";
import dayjs from "dayjs";
import { AppointmentContext } from "./Scheduler";
//component for showing insights and analytics
const Analytics = ({ onCreateAppointment }) => {
  const apppointmentContext = useContext(AppointmentContext);
  //state for storing the selected option from the duration drop-down button
  const [option, setOption] = useState("Current Week");
  //function for updating the selected option
  const handleChange = (option) => {
    setOption(option);
  };
  //states for storing the datas needed for analytics
  const [allAppointments, setAllAppointments] = useState([]);
  const [noOfAppointments, setNoOfAppointments] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [remainingAppointments, setRemainingAppointments] = useState(0);
  const [weekData, setWeekData] = useState({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  });

  //get appointments data based on the selected option from drop-down button
  useEffect(() => {
    const selectedOption = option.split(" ")[1];
    const startTime = dayjs().startOf(selectedOption).toISOString();
    const endTime = dayjs().endOf(selectedOption).toISOString();
    fetch(`http://localhost:5169/api/appointments?from=${startTime}&to=${endTime}&timeZoneOffset=${new Date().getTimezoneOffset()}`)
      .then((response) => response.json())
      .then((data) => setAllAppointments(data));
  }, [
    apppointmentContext.state.isAppointmentCreated,
    apppointmentContext.state.isAppointmentDeleted,
    option,
    apppointmentContext.state.isAppointmentUpdated,
  ]);
  //functions for calculating datas needed for analytics
  useMemo(() => {
    const currentTime = dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
    //to find number of appointments for a selected period
    setNoOfAppointments(allAppointments.length);
    //to find total hours of appointments
    const totalTime =
      allAppointments &&
      allAppointments.reduce(
        (totalDuration, appointment) =>
          (totalDuration +=
            dayjs(appointment.endTime).diff(dayjs(appointment.startTime), "m") /
            60),
        0
      );

    setTotalHours(totalTime.toFixed(1));
    //to find average hours
    const averageHours = Math.round(totalTime / allAppointments.length);
    averageHours && setAverageTime(averageHours);
    //to find appointments remaining for the selected period
    let remainingMeeting = 0;
    const remainingAppointments = () =>
      allAppointments.forEach((appointment) => {
        if (appointment.startTime.substring(0, 19) >= currentTime) {
          remainingMeeting++;
        }
        return remainingMeeting;
      });
    remainingAppointments();
    setRemainingAppointments(remainingMeeting);
    //to find day wise appointment hours
    const weeklyAnalytics = (day) =>
      allAppointments
        .filter(
          (appointment) =>
            dayjs(appointment.startTime.substring(0, 19)).format("dddd") === day
        )
        .reduce(
          (totalDuration, appointment) =>
            (totalDuration +=
              dayjs(appointment.endTime).diff(
                dayjs(appointment.startTime),
                "m"
              ) / 60),
          0
        );
    const mondayData = weeklyAnalytics("Monday");
    const tuesdayData = weeklyAnalytics("Tuesday");
    const wednesdayData = weeklyAnalytics("Wednesday");
    const thursdayData = weeklyAnalytics("Thursday");
    const fridayData = weeklyAnalytics("Friday");
    const saturdayData = weeklyAnalytics("Saturday");
    const sundayData = weeklyAnalytics("Sunday");
    setWeekData((prevState) => {
      return {
        ...prevState,
        Mon: mondayData,
        Tue: tuesdayData,
        Wed: wednesdayData,
        Thu: thursdayData,
        Fri: fridayData,
        Sat: saturdayData,
        Sun: sundayData,
      };
    });
  }, [allAppointments, option, totalHours]);

  return (
    <>
      <DropDownButton options={["Current Week", "Current Month", "Current Year"]} selectedOption={option} handleSelectedOption={handleChange} />
      <Insights
        noOfAppointments={noOfAppointments}
        totalHours={totalHours}
        averageTime={averageTime}
        remainingAppointments={remainingAppointments}
      />
      <Chart weekData={weekData} />
    </>
  );
};

export default Analytics;
