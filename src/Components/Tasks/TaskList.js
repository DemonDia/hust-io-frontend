import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskRow from "./TaskRow";
function TaskList({ Contents, DeleteContent,EditStatus,EditName }) {
    // ============search as you type============
    const [search, setSearch] = useState("");
    // ============filter in asc and desc============
    const [filter, setFilter] = useState(0);
    const filterOptions = ["A-Z", "Z-A"];
    // ============edit task name============
    const editTaskName = async (taskName, taskId) => {
        await EditName(taskName, taskId)
    };
    // ============edit task completion============
    const editTaskCompletion = async (taskStatus, taskId) => {
        await EditStatus(taskStatus, taskId)
    };
    // ============delete task============
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
                        return content.taskName
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                        .sort((a, b) =>
                            filter == 0
                                ? a.taskName.toLowerCase() > b.taskName.toLowerCase()
                                    ? 1
                                    : -1
                                : b.taskName.toLowerCase() > a.taskName.toLowerCase()
                                ? 1
                                : -1
                        )
                        .map((content) => {
                            return (
                                <TaskRow
                                    task={content}
                                    key={content._id}
                                    deleteMethod={deleteTask}
                                    editTaskMethod={editTaskName}
                                    editCompletionMethod={editTaskCompletion}
                                />
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
