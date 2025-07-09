

export function getRandomImage(width?: number, height?: number): string {
  const baseUrl = 'https://placeholderimage.eu/api';
  if (!width && !height) {
    return baseUrl
  }
  if (!width || !height) {
    throw new Error('Both width and height must be provided');
  }
  return `https://placeholderimage.eu/api${"/" + width + "/" + height}`
}
