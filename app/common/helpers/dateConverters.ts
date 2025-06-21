// Convert Date to "HH:MM:SS" format
export const dateToTimeString = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
};

// Convert "HH:MM:SS" string to Date (using today's date)
export const timeStringToDate = (timeString: string): Date => {
  const [hours, minutes, seconds = '0'] = timeString.split(':');
  const date = new Date();
  
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(parseInt(seconds, 10));
  date.setMilliseconds(0);
  
  return date;
};

// Convert "HH:MM:SS" string to Date with specific date
export const timeStringToDateWithDate = (timeString: string, baseDate: Date): Date => {
  const [hours, minutes, seconds = '0'] = timeString.split(':');
  const date = new Date(baseDate);
  
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(parseInt(seconds, 10));
  date.setMilliseconds(0);
  
  return date;
};

// Convert Date to "HH:MM" format (without seconds)
export const dateToTimeStringShort = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

// Convert "HH:MM" string to Date (using today's date)
export const timeStringShortToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);
  
  return date;
};