export function getDaysBetween(date1: Date, date2: Date): number {
  const diffTime = date2.getTime() - date1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(diffDays));
}

export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
