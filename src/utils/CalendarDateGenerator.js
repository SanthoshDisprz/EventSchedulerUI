import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDates = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDates.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDates.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }
//remaining dates in the calendar(i.e) next month dates
  const remainingDates = 42 - arrayOfDates.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remainingDates;
    i++
  ) {
    arrayOfDates.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDates;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
