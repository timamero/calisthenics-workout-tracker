export function getNumberBeforeS(inputString: string): string {
  if (typeof inputString !== 'string') {
    console.error('Invalid input: Please provide a string.');
    return '';
  }

  const regex = /^(\d+)S$/;
  const match = inputString.match(regex);

  if (match) {
    return parseInt(match[1], 10).toString();
  }
  return '';
}

/**
 * Extracts the number of seconds from an ISO 8601 duration string formatted as "PT{number}S"
 * Example: "PT45S" => "45"
 */
export function getSecondsInDuration(inputString: string): string {
  if (typeof inputString !== 'string') {
    console.error('Invalid input: Please provide a string.');
    return '';
  }

  const regex = /^PT(\d+)S$/;
  const match = inputString.match(regex);

  if (match) {
    return match[1];
  }
  return '';
}
