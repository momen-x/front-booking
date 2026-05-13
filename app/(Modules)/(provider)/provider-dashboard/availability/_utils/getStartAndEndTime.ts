export default function numberToTime(startOrEndTime: number): Date {
  const date = new Date();
  date.setHours(Math.floor(startOrEndTime / 60));
  date.setMinutes(startOrEndTime % 60);
  date.setSeconds(0);
  return date;
}
