export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-IN", options);
};
