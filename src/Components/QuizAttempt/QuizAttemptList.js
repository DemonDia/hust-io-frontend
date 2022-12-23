import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusFilterCheckbox from "./StatusFilterCheckbox";
import EmptyListBanner from "../General/EmptyListBanner";

function QuizAttemptList({ Contents, DeleteContent }) {
    // ============search as you type============
    const [search, setSearch] = useState("");
    // ============filter in asc and desc============
    const [filter, setFilter] = useState(0);
    const filterOptions = ["Latest", "Earliest", "A-Z", "Z-A"];

    const statuses = ["", "In progress", "Marking in progress", "Completed"];

    const [tickedValues, setTickedValues] = useState([]);
    const [statusDict, setStatusDict] = useState([
        { value: 1, text: "In progress", checked: true },
        { value: 2, text: "Marking in progress", checked: true },
        { value: 3, text: "Completed", checked: true },
    ]);

    // ============handle checkbox change============
    const changeTickedStatus = (currentStatus, newValue) => {
        const updatedStatus = statusDict.map((status) => {
            if (status.value == currentStatus) {
                status.checked = newValue;
            }
            return status;
        });
        setStatusDict(updatedStatus);
        updateTickFilter();
    };

    const updateTickFilter = () => {
        var tickedValues = [];
        statusDict.map((status) => {
            if (status.checked == true) {
                tickedValues.push(status.value);
            }
        });
        setTickedValues(tickedValues);
    };

    // ============delete event============
    const deleteAttempt = async (quizId) => {
        await DeleteContent(quizId);
    };
    useEffect(() => {
        updateTickFilter();
    }, []);
    return (
        <div>
            <div className="listComponent card">
                <div className="columns contentFilter">
                    <div className="column is-half-tablet">
                        <label>Search:</label>
                        <div>
                            <div className="control">
                                <input
                                    className="input is-focused"
                                    type="text"
                                    placeholder="Seach by name..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="column is-one-quarter-tablet">
                        <label>Filter:</label>
                        <br></br>
                        <div className="select is-focused">
                            <select
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.target.value);
                                }}
                            >
                                {filterOptions.map((filterOption, index) => {
                                    return (
                                        <option value={index} key={index}>
                                            {filterOption}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="column is-one-quarter-tablet is-half-mobile">
                        <label>Completion Status:</label>
                        {statusDict.map((status, index) => {
                            return (
                                <>
                                    <br></br>
                                    <StatusFilterCheckbox
                                        key={index}
                                        statusOption={status}
                                        handleChange={changeTickedStatus}
                                    />
                                </>
                            );
                        })}
                    </div>
                </div>
                {Contents.length > 0 ? (
                    <>
                        {Contents.filter((content) => {
                            return (
                                content.quizName
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) &&
                                tickedValues.includes(content.attemptStatus)
                            );
                        })
                            .sort((a, b) =>
                                filter == 0
                                    ? b.isoDate > a.isoDate
                                        ? 1
                                        : -1
                                    : filter == 1
                                    ? a.isoDate > b.isoDate
                                        ? 1
                                        : -1
                                    : filter == 2
                                    ? a.quizName.toLowerCase() >
                                      b.quizName.toLowerCase()
                                        ? 1
                                        : -1
                                    : b.quizName.toLowerCase() >
                                      a.quizName.toLowerCase()
                                    ? 1
                                    : -1
                            )
                            .map((content) => {
                                const {
                                    quizName,
                                    _id,
                                    attemptStatus,
                                    isoDate,
                                    quizScore,
                                    noOfQuestions,
                                } = content;
                                const date = new Date(isoDate);
                                const year = date.getFullYear();
                                const month = date.getMonth();
                                const day = date.getDate();
                                var hour = date.getHours();
                                if(hour <= 9){
                                    hour = "0"+hour;
                                }
                                var minute = date.getMinutes();
                                if(minute <= 9){
                                    minute = "0"+date;
                                }
                                var seconds = date.getSeconds();
                                if(seconds <= 9){
                                    seconds = "0"+seconds;
                                }
                                
                                
                                const dateString = `${day}-${
                                    month + 1
                                }-${year}, ${hour == "0" ? "00" : hour}:${
                                    minute == "0" ? "00" : minute
                                }:${seconds == "0" ? "00" : seconds}`;
                                return (
                                    <div key={_id} className="listItem">
                                        <div className="listItem-contents">
                                            <h5 className="subtitle">
                                                {quizName} (
                                                {statuses[attemptStatus]}
                                                {attemptStatus == 3 ? (
                                                    <>
                                                        , Score: {quizScore}/
                                                        {noOfQuestions}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                )
                                            </h5>
                                            Attempt Date: {dateString}
                                        </div>
                                        <div className="listItem-buttons">
                                            <Link
                                                to={`/quizzes/attempt/${_id}`}
                                            >
                                                {attemptStatus == 1 ? (
                                                    <>Continue</>
                                                ) : (
                                                    <>
                                                        {attemptStatus == 2 ? (
                                                            <>Mark</>
                                                        ) : (
                                                            <>View </>
                                                        )}
                                                    </>
                                                )}
                                            </Link>
                                            <Link
                                                onClick={() =>
                                                    deleteAttempt(_id)
                                                }
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                ) : (
                    <EmptyListBanner text={"No quiz attempts found"}/>
                )}
            </div>
        </div>
    );
}

export default QuizAttemptList;
