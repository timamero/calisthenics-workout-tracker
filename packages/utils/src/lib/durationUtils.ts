/**
 * Extracts the number of seconds from an ISO 8601 duration string formatted as "PT{number}S"
 * Example: "PT45S" => "45"
 */
export function getSecondsInDuration(inputString: string): string {
  if (typeof inputString !== "string") {
    console.error("Invalid input: Please provide a string.");
    return "";
  }

  const regex = /^PT(\d+)S$/;
  const match = inputString.match(regex);

  if (match) {
    return match[1];
  }
  return "";
}

/**
 * Converts an ISO 8601 duration string to a formatted time string
 * Returns "HH:MM:SS" format
 * Example: "PT45S" => "00:00:45", "PT1H30M45S" => "01:30:45"
 */
export function formatDuration(isoString: string): string {
  if (typeof isoString !== "string") {
    console.error("Invalid input: Please provide a string.");
    return "";
  }

  // Check if already in correct format (MM:SS or HH:MM:SS)
  const mmssMatch = isoString.match(/^(\d{2}):(\d{2})$/);
  if (mmssMatch) {
    return `00:${isoString}`;
  }
  if (/^(\d{2}):(\d{2}):(\d{2})$/.test(isoString)) {
    return isoString;
  }

  // ISO 8601 duration regex: PT[n]H[n]M[n]S
  const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  const match = isoString.match(regex);

  if (!match) {
    return "";
  }

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const pad = (num: number): string => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
