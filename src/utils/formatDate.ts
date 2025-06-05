export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const hour = date.getHours();
  const minute = date.getMinutes();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  const paddedMinute = minute.toString().padStart(2, "0");

  return `${day}${suffix} ${month} at ${hour12}:${paddedMinute} ${ampm}`;
};
