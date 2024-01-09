import React, { useState, useEffect } from "react";
import { format, addDays, isDate } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import CalendarWeek from "./CalendarWeek";
import "./Calendar.css"; // Add styles for Calendar

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [weeklyData, setWeeklyData] = useState([]); // Placeholder for your data

  // Function to load weekly data based on the selected date and timezone
  const loadWeeklyData = (date, tz) => {
    try {
      // Add logic to fetch data based on the selected date and timezone
      // Update the weekly data state
      const newData = []; // Placeholder for fetched data
      setWeeklyData(newData);
    } catch (error) {
      console.error("Error loading weekly data:", error.message);
    }
  };

  // useEffect to load data when the component mounts or when date/timezone changes
  useEffect(() => {
    try {
      if (isDate(selectedDate)) {
        loadWeeklyData(selectedDate, timezone);
      } else {
        throw new Error("Invalid selectedDate value");
      }
    } catch (error) {
      console.error("Error in useEffect:", error.message);
    }
  }, [selectedDate, timezone]);

  const handleDateChange = (direction) => {
    try {
      if (isDate(selectedDate)) {
        const newDate = addDays(selectedDate, direction * 7);
        setSelectedDate(newDate);
      } else {
        throw new Error("Invalid selectedDate value");
      }
    } catch (error) {
      console.error("Error in handleDateChange:", error.message);
    }
  };

  const handleTimezoneChange = (selectedTimezone) => {
    try {
      // Add additional validation if needed for selectedTimezone
      setTimezone(selectedTimezone);
    } catch (error) {
      console.error("Error in handleTimezoneChange:", error.message);
    }
  };

  return (
    <div className="calendar-container">
      <h2>
        Date:{" "}
        {isDate(selectedDate)
          ? format(selectedDate, "yyyy-MM-dd")
          : "Loading..."}
      </h2>
      <button onClick={() => handleDateChange(-1)}>Previous Week</button>
      <button onClick={() => handleDateChange(1)}>Next Week</button>

      <div>
        <label>Timezone: </label>
        <select
          value={timezone}
          onChange={(e) => handleTimezoneChange(e.target.value)}
        >
          <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>

      <CalendarWeek
        selectedDate={selectedDate}
        timezone={timezone}
        weeklyData={weeklyData}
      />
    </div>
  );
};

export default Calendar;
