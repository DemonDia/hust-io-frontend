import React, { useState } from "react";
import { Link } from "react-router-dom";
function TaskList({ Contents, DeleteContent }) {
    // ============search as you type============
    const [search, setSearch] = useState("");
    // ============filter in asc and desc============
    const [filter, setFilter] = useState();
    const filterOptions = ["A-Z", "Z-A"];
    // ============delete event============
    const deleteTask = async (eventId) => {
        await DeleteContent(eventId);
    };
    return (
        <div className="listComponent">
            <div className="container">
                <h1 className="title">Task List</h1>
            </div>
            <div className="columns">
                <div className="column is-half-tablet">
                    <label>Search:</label>
                    {search}
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
                {/* <div
                    className="column is-one-quarter-tablet is-half-mobile"
                    style={{ alignSelf: "center" }}
                >
                    <Link className="button button-link" to="/tasks/add">
                        Add
                    </Link>
                </div> */}
            </div>
            {Contents.length > 0 ? (
                <>
                    {Contents.filter((content) => {
                        return content.taskName
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    }) .sort((a, b) =>
                    filter == 1
                        ? a.taskName > b.taskName
                            ? 1
                            : -1
                        : b.taskName > a.taskName
                        ? 1
                        : -1
                ).map((content) => {
                        const { addedDate, taskName, _id } = content;
                        const { year, month, day } = addedDate;
                        return (
                            <div key={_id} className="listItem">
                                <div className="listItem-contents">
                                    <h5 className="subtitle">
                                        {taskName} -{" "}
                                        {`${year}/${month + 1}/${day}`}
                                    </h5>
                                </div>
                                <div className="listItem-buttons">
                                    <Link to={`/tasks/${_id}`}>Edit</Link>
                                    <Link onClick={() => deleteTask(_id)}>
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
    );
}

export default TaskList;