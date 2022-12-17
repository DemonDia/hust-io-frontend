import React, { useState } from "react";
import { Link } from "react-router-dom";
function JournalList({ Contents, DeleteContent }) {
    // ============search as you type============
    const [search, setSearch] = useState("");
    // ============filter in asc and desc============
    const [filter, setFilter] = useState();
    const filterOptions = ["Latest", "Earliest", "A-Z", "Z-A"];
    // ============delete event============
    const deleteJournal = async (eventId) => {
        await DeleteContent(eventId);
    };
    return (
        <div>
            <div className="listComponent">
                <div className="container">
                    <h1 className="title">Journal Entry List</h1>
                </div>
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
                    <div
                        className="column is-one-quarter-tablet is-half-mobile"
                        style={{ alignSelf: "center" }}
                    >
                        <Link className="button button-link" to="/journals/add">
                            Add
                        </Link>
                    </div>
                </div>
                {Contents.length > 0 ? (
                    <>
                        {Contents.filter((content) => {
                            return content.journalTitle
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
                                    ? a.journalTitle.toLowerCase() > b.journalTitle.toLowerCase()
                                        ? 1
                                        : -1
                                    : b.journalTitle.toLowerCase() > a.journalTitle.toLowerCase()
                                    ? 1
                                    : -1
                            )
                            .map((content) => {
                                const { date, journalTitle,moodRating, _id } = content;
                                const { year, month, day, hour, minute } = date;
                                return (
                                    <div key={_id} className="listItem">
                                        <div className="listItem-contents">
                                            <h5 className="subtitle">
                                                {journalTitle} ({moodRating}/5) -{" "}
                                                {`${year}/${
                                                    month + 1
                                                }/${day} ${hour}:${
                                                    minute == 0 ? "00" : minute
                                                }`}
                                            </h5>
                                        </div>
                                        <div className="listItem-buttons">
                                            <Link to={`/journals/${_id}`}>
                                                View
                                            </Link>
                                            <Link
                                                onClick={() => deleteJournal(_id)}
                                            >
                                                Delete
                                                {/* <DeleteIcon/> */}
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

export default JournalList;
