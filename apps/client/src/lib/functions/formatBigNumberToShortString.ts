


export function formatBigNumberToShortString(value: number | bigint | string): string {
  if (typeof value === 'bigint' || typeof value === 'string') {
    value = Number(value);
  }

  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  } else {
    return value.toString();
  }
}
