export const mapLayers = (map: string | undefined) => {
  const baseUrl = 'https://api.maptiler.com/maps';
  if (!map) {
    return `${baseUrl}/streets-v2/style.json?key=2ovqIDOtsFG069J69Ap2`;
  }
  return `${baseUrl}/${map}/style.json?key=2ovqIDOtsFG069J69Ap2`;
};

export const layers = [
  'streets-v2',
  'hybrid',
  'streets',
  'basic',
  'basic-v2-dark',
  'outdoor',
  'winter',
];
