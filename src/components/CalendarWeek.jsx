import React from "react";
import {
  format,
  setHours,
  getHours,
  isSameDay,
  isWeekend,
  startOfWeek,
  addDays,
  isDate,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const CalendarWeek = ({ selectedDate, timezone, weeklyData }) => {
  const generateTimeSlots = () => {
    const startTime = setHours(selectedDate, 8);
    const endTime = setHours(selectedDate, 23);

    const timeSlots = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      timeSlots.push(currentTime);
      currentTime = setHours(currentTime, getHours(currentTime) + 1);
    }

    return timeSlots;
  };

  const getFormattedTime = (date) => {
    try {
      if (isDate(date)) {
        const zonedDate = utcToZonedTime(date, timezone);
        return format(zonedDate, "HH:mm zzz");
      } else {
        throw new Error("Invalid date value");
      }
    } catch (error) {
      console.error("Error in getFormattedTime:", error.message);
      return "Invalid Time";
    }
  };

  const handleCheckboxChange = (day, time) => {
    try {
      // Add logic to handle checkbox changes
    } catch (error) {
      console.error("Error in handleCheckboxChange:", error.message);
    }
  };

  const days = Array.from({ length: 5 }, (_, index) =>
    format(addDays(startOfWeek(selectedDate), index), "yyyy-MM-dd")
  );

  const timeSlots = generateTimeSlots();

  return (
    <div className="calendar-week-container">
      <h3>
        Week of{" "}
        {isDate(selectedDate)
          ? format(selectedDate, "yyyy-MM-dd")
          : "Loading..."}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map((day) => (
              <th key={day}>{format(new Date(day), "iiii")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td>{getFormattedTime(time)}</td>
              {days.map((day) => (
                <td key={`${day}-${time}`}>
                  {!isWeekend(new Date(day)) && (
                    <input
                      type="checkbox"
                      checked={weeklyData.some(
                        (data) =>
                          isSameDay(new Date(data.Date), new Date(day)) &&
                          data.Time === getFormattedTime(time)
                      )}
                      onChange={() =>
                        handleCheckboxChange(day, getFormattedTime(time))
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarWeek;
