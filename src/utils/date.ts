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
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    const hour = "hour" in date ? date.hour : 0;
    const minute = "minute" in date ? date.minute : 0;
    const second = "second" in date ? date.second : 0;

    return `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
};

const toInputDate = (date: string) => {
if (!date) return null;
    
    // Ganti spasi dengan T agar valid ISO 8601
    const normalized = date.replace(" ", "T");
    const d = new Date(normalized);
    
    if (isNaN(d.getTime())) return null;
    
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