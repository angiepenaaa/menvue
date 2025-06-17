export function formatDistance(distance: string): string {
  const miles = parseFloat(distance.replace(' mi', ''));
  
  if (miles < 0.1) {
    return 'Less than 0.1 miles away';
  } else if (miles < 1) {
    return `${(miles * 5280).toFixed(0)} feet away`;
  } else {
    return `${miles.toFixed(1)} miles away`;
  }
}