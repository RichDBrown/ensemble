import { getDaysBetween } from "./dates";

it("getDaysBetween returns correct number of days", () => {
  const date1 = new Date("2025-11-10");
  const date2 = new Date("2025-11-25");
  const daysBetween = getDaysBetween(date1, date2);
  expect(daysBetween).toBe(15);
});
