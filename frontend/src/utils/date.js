// Helper to format date as YYYY-MM-DD
export function formatDateISO(dateObj) {
  return dateObj.toISOString().slice(0, 10);
}

// Display format DD.MM.YYYY
export function formatDisplayDate(isoString) {
  const date = new Date(isoString);
  const weekday = new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(date);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0'); // month is zero-based
  const d = String(date.getDate()).padStart(2, '0');

  return `${weekday} ${d}.${m}.${y}`;
}

export function getTodayString() {
  return formatDateISO(new Date());
}

export function getFeedingTime() {
  const now = new Date();
  const hours = now.getHours();
  return hours < 13 ? 'MORNING' : 'EVENING';
}

export function getNextFeeding(dateStr, time) {
  const dateObj = new Date(dateStr);
  if (time === 'MORNING') {
    return [dateStr, 'EVENING'];
  } else {
    dateObj.setDate(dateObj.getDate() + 1);
    return [formatDateISO(dateObj), 'MORNING'];
  }
}

export function getPrevFeeding(dateStr, time) {
  const dateObj = new Date(dateStr);
  if (time === 'EVENING') {
    return [dateStr, 'MORNING'];
  } else {
    dateObj.setDate(dateObj.getDate() - 1);
    return [formatDateISO(dateObj), 'EVENING'];
  }
}
