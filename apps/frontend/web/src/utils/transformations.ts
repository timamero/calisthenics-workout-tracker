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
