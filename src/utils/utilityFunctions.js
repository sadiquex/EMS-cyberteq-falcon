// helper functions

export const ChangeDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function getFormattedDate() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();

  const dayOfWeek = daysOfWeek[today.getDay()];
  const dayOfMonth = today.getDate();
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

  // Add suffix to the day (e.g., 1st, 2nd, 3rd, 4th)
  const daySuffix =
    dayOfMonth > 10 && dayOfMonth < 20
      ? "th"
      : dayOfMonth % 10 === 1
      ? "st"
      : dayOfMonth % 10 === 2
      ? "nd"
      : dayOfMonth % 10 === 3
      ? "rd"
      : "th";

  return `${dayOfWeek}, ${dayOfMonth}${daySuffix} ${monthName} ${year}`;
}

export const todayDate = getFormattedDate();

// Function to calculate the leave duration
export function calculateLeaveDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const durationInMilliseconds = end - start;

  // Convert the duration to days
  const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

  // Round to the nearest whole number
  const roundedDuration = Math.round(durationInDays);

  return `${roundedDuration} day${roundedDuration !== 1 ? "s" : ""}`;
}
