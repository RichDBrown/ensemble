import { getDaysBetween, getFormattedDate } from "./dates";

it("getDaysBetween returns correct number of days", () => {
  const date1 = new Date("2025-11-10");
  const date2 = new Date("2025-11-25");
  const daysBetween = getDaysBetween(date1, date2);
  expect(daysBetween).toBe(15);
});

it('getFormattedDate returns date in "YYYY-MM-DD" format', () => {
  const date = new Date("2025-11-23T00:00:00");
  const formattedDate = getFormattedDate(date);
  expect(formattedDate).toBe("2025-11-23");
});
