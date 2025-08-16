import { z } from "zod";

// A simple regex to validate an ISO 8601 duration string like 'P1Y2M3DT4H5M6S'
const durationRegex =
  /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;

export const DurationSchema = z
  .string()
  .regex(durationRegex, {
    message: "Invalid ISO 8601 duration format",
  })
  .transform((str) => {
    // This is where you would parse the string into a structured object.
    const match = str.match(durationRegex);
    if (!match) return null; // Should not happen due to regex check
    return {
      years: parseInt(match[1] || "0"),
      months: parseInt(match[2] || "0"),
      weeks: parseInt(match[3] || "0"),
      days: parseInt(match[4] || "0"),
      hours: parseInt(match[6] || "0"),
      minutes: parseInt(match[7] || "0"),
      seconds: parseInt(match[8] || "0"),
    };
  });