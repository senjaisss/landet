export const isValidISODate = (dateString: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime()) &&
        date.toISOString().startsWith(dateString);
};