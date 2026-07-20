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

    return `${standardTime(year)}-${standardTime(month)}-${standardTime(day)} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
};

const toInputDate = (date: string) => {
    if (!date) return null;
    
    try {
        const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
        return formattedDate;
    } catch {
        return null;
    }
};

export { toDateStandard, toInputDate };