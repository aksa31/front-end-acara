import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standardTime = (time : number) => {
    if(time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

const toDateStandard = (date: DateValue) => {
    const year = date.year;
    const month = date.month;
    const day = date.day;

    const hour = "hour" in date ? date.hour : 0;
    const minute = "minute" in date ? date.minute : 0;
    const second = "second" in date ? date.second : 0;

    const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
    return result;
};

const toInputDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  const iso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+07:00`;
  return parseAbsoluteToLocal(iso);
};

export { toDateStandard, toInputDate };