import React, { useState } from "react";

function TaskForm({ addTaskMethod }) {
    // props
    // addTaskMethod --> adds task to DB

    // state
    // taskName --> name of task to add

    // methods
    // add task --> adds new task by calling addTaskMethod (date is given date by default)--> emptys taskName upon successful adding
    const [taskName, setTaskName] = useState("");
    const addTask = async () => {
        await addTaskMethod(taskName).then(setTaskName(""));
    };
    return (
        <div className="container taskFormContainer columns">
            <input
                className="input column is-three-quarters"
                type="text"
                placeholder="Add new task name (Max 20 characters)"
                value={taskName}
                onChange={(e) => {
                    setTaskName(e.target.value);
                }}
            />
            <button
                type="button"
                className="button addButton"
                onClick={() => {
                    addTask();
                }}
            >
                Add
            </button>
        </div>
    );
}

export default TaskForm;
