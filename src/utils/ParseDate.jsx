import { parse } from "date-fns";

export const parsePPPDate = (dateStr) => {
  try {
    // Define the format
    const parsedDate = parse(dateStr, "MMMM do, yyyy", new Date());
    return parsedDate;
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date(NaN); // Return an invalid date
  }
};
