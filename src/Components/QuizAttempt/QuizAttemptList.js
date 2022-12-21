import React, { useState } from "react";
import { Link } from "react-router-dom";
function QuizAttemptList({ Contents, DeleteContent }) {
    // ============search as you type============
    const [search, setSearch] = useState("");
    // ============filter in asc and desc============
    const [filter, setFilter] = useState(0);
    const filterOptions = ["Latest", "Earliest", "A-Z", "Z-A"];
    // ============delete event============
    const deleteAttempt = async (quizId) => {
        await DeleteContent(quizId);
    };
    return (
        <div>
            <div className="listComponent">
                <div className="columns">
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

                    <div className="column is-one-quarter-tablet is-half-mobile">
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
                </div>
                {Contents.length > 0 ? (
                    <>
                        {Contents.filter((content) => {
                            return content.quizName
                                .toLowerCase()
                                .includes(search.toLowerCase());
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
                                } = content;
                                const date = new Date(isoDate)
                                const year = date.getFullYear()
                                const month = date.getMonth()
                                const day = date.getDay()
                                const hour = date.getHours()
                                const minute = date.getMinutes()
                                const dateString = `${day}-${month}-${year}, ${hour}:${minute}`
                                return (
                                    <div key={_id} className="listItem">
                                        <div className="listItem-contents">
                                            <h5 className="subtitle">
                                                {quizName}
                                            </h5>
                                            Attempted at: {dateString}
                                        </div>
                                        <div className="listItem-buttons">
                                            <Link
                                                to={`/quizzes/attempt/${_id}`}
                                            >
                                                {attemptStatus == 1 ? (
                                                    <>Continue</>
                                                ) : (
                                                    <>
                                                        {attemptStatus ==
                                                        2 ? (
                                                            <>Mark</>
                                                        ) : (
                                                            <>View </>
                                                        )}
                                                    </>
                                                )}
                                            </Link>
                                            <Link
                                                onClick={() => deleteAttempt(_id)}
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                ) : (
                    <h2 className="title">Nothing here</h2>
                )}
            </div>
        </div>
    );
}

export default QuizAttemptList;
