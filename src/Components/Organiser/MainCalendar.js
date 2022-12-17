import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function MainCalendar(props) {
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    // year and month in numbers
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);

    const [currentYear, setCurrentYear] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);

    const [days, setDays] = useState(0);
    const [calendarDays, setCalendarDays] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState({});
    // calendarEvents format be:
    // { day: [events]}
    const monthArr = [
        "Select A Month",
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dayArr = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const generateEventJson = (content) => {
        var results = {};
        content.map((item) => {
            const currDay = item.date.day;
            if (currDay in results) {
                results[currDay] = [...results[currDay], item];
            } else {
                results[currDay] = [item];
            }
        });
        return results;
    };
    const loadCalendar = async (year, month) => {
        // get the calendar stuff
        setLoading(true);
        const calendarContent = await axios.get(
            process.env.REACT_APP_BACKEND_API +
                `/events/${year}/${month - 1}/${props.userId}`,
            {
                headers: { Authorization: `Bearer ${currentToken}` },
            }
        );
        setCalendarEvents(generateEventJson(calendarContent.data.data));

        const currDate = new Date(year, month, 0);
        var noOfDays = currDate.getDate();
        setDays(noOfDays);
        // days --> first of each month
        var firstDayOfMonth = new Date(year, month - 1, 1);
        var weekRows = [];
        var dayCounts = 0;
        var weekCounts = 0;
        while (dayCounts < noOfDays) {
            var weekRow = [];
            // day of the week
            for (var day = 0; day < 7; day++) {
                // first week
                if (weekCounts == 0) {
                    if (day < firstDayOfMonth.getDay()) {
                        weekRow.push(" ");
                    } else {
                        dayCounts += 1;
                        weekRow.push(dayCounts);
                    }
                } else {
                    if (dayCounts >= noOfDays) {
                        weekRow.push(" ");
                    } else {
                        dayCounts += 1;
                        weekRow.push(dayCounts);
                    }
                }
            }
            weekRows.push(weekRow);
            weekCounts += 1;
        }
        setCalendarDays(weekRows);
        setLoading(false);
    };

    const changeYear = (change) => {
        const newYear = year + change;
        setYear(newYear);
        loadCalendar(newYear, month);
    };

    const changeMonth = (newMonth) => {
        if (newMonth != 0) {
            setMonth(newMonth);
            loadCalendar(year, newMonth);
        }
    };
    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        setYear(currentYear);
        setMonth(currentMonth);

        setCurrentYear(currentYear);
        setCurrentMonth(currentMonth);
        setCurrentDay(currentDay);

        loadCalendar(currentYear, currentMonth);
    }, []);
    return (
        <div>
            <h2 className="title">
                {monthArr[month]} {year}
            </h2>
            <div className="container calendarContainer">
                <div className="columns">
                    <div className="column is-half">
                        <label>Year:</label>
                        <div id="yearField">
                            <div className="control yearChangeBtnContainer">
                                <button
                                    className="button yearChangeBtn"
                                    onClick={() => {
                                        changeYear(-1);
                                    }}
                                >
                                    -
                                </button>
                            </div>
                            <div className="control">
                                <input
                                    className="input is-focused"
                                    type="text"
                                    placeholder="Focused input"
                                    value={year}
                                    disabled
                                    style={{ background: "white" }}
                                />
                            </div>
                            <div className="control yearChangeBtnContainer">
                                <button
                                    className="button yearChangeBtn"
                                    onClick={() => {
                                        changeYear(1);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="column is-half">
                        <label>Month:</label>
                        <br></br>
                        <div className="select is-focused">
                            <select
                                value={month}
                                onChange={(e) => {
                                    changeMonth(e.target.value);
                                }}
                            >
                                {monthArr.map((month, index) => {
                                    return (
                                        <option value={index} key={index}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                {!loading ? <></> : <></>}

                <table className="calendar">
                    <thead>
                        <tr>
                            {dayArr.map((day, index) => {
                                return (
                                    <th key={index}>
                                        <div className="calendarHeaderCell">
                                            {day}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {calendarDays.map((calendarWeek, index) => {
                            return (
                                <tr className="row calendarRow" key={index}>
                                    {calendarWeek.map((calendarDay, index) => {
                                        return calendarDay == " " ? (
                                            <td key={index}>
                                                <div className="calendarCellDisabled"></div>
                                            </td>
                                        ) : (
                                            <td key={index}>
                                                <Link
                                                    to={`/organiser/${year}-${month}-${calendarDay}`}
                                                >
                                                    <div
                                                        className={
                                                            month ==
                                                                currentMonth &&
                                                            year ==
                                                                currentYear &&
                                                            calendarDay ==
                                                                currentDay
                                                                ? "todayCalendarCell"
                                                                : "calendarCell"
                                                        }
                                                    >
                                                        {/* check if there are events */}
                                                        {calendarDay in
                                                        calendarEvents ? (
                                                            <span className="tag is-danger">
                                                                (
                                                                {
                                                                    calendarEvents[
                                                                        calendarDay
                                                                    ].length
                                                                }
                                                                ){" "}
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <br></br>
                                                        <label>
                                                            {calendarDay}
                                                        </label>

                                                        {/* {month ==
                                                            currentMonth &&
                                                        year == currentYear &&
                                                        calendarDay ==
                                                            currentDay ? (
                                                            <span class="tag is-link">
                                                                {calendarDay}
                                                            </span>
                                                        ) : (
                                                            <label>
                                                                {calendarDay}
                                                            </label>
                                                        )} */}
                                                    </div>
                                                </Link>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MainCalendar;
