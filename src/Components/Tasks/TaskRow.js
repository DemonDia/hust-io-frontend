import React, { useState } from "react";
import { Link } from "react-router-dom";
function TaskRow({
    task,
    editTaskMethod,
    editCompletionMethod,
    deleteMethod,
    displayMode,
}) {
    // props:
    // task Object

    // methods
    // editTaskMethod --> edit task name
    // editCompletionMethod --> edit completion
    // deleteMethod --> delete task

    // displayMode (all or givenDate)
    // if specific date is given, do NOT show date --> givenDate
    // if specific date is NOT given, show the dates --> all

    // states:
    // isEditing --> boolean
    // if true: --> ONNLY task name is editable
    // if false: --> ONLY completion is editable
    // taskName --> taskName if given
    // completed --> completed or not
    const [isEditing, setIsEditing] = useState(false);
    const [taskName, setTaskName] = useState(task.taskName);
    const [completed, setCompleted] = useState(task.completed);

    // methods:
    // saveChangedName --> for the updated taskName --> calls editTaskMethod
    // saveChangedStatus --> for the completion status --> calls editCompletionMethod
    // deleteTask --> deletes task --> calls deleteMethod
    // cancelEdit --> editing to be false + back to original values
    const saveChangedName = async () => {
        await editTaskMethod();
    };
    const saveChangedStatus = async (newStatus) => {
        setCompleted(newStatus);
        await editCompletionMethod(newStatus,task._id);
    };
    const deleteTask = async () => {
        await deleteMethod(task._id);
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setTaskName(task.taskName);
    };

    return (
        <div className="listItem columns">
            <div className="listItem-contents column is-three-quarters">
                {isEditing ? (
                    <h5 className="subtitle">editing</h5>
                ) : (
                    <h5 className="subtitle">
                        {" "}
                        {taskName} -{" "}
                        {`${task.addedDate.year}/${task.addedDate.month + 1}/${
                            task.addedDate.day
                        }`}
                    </h5>
                )}
            </div>
            <div className="listItem-buttons">
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        disabled={!isEditing ? false : true}
                        onClick={(e) => {
                            saveChangedStatus(e.target.checked);
                        }}
                    />
                    Done
                </label>
                {isEditing ? (
                    <>
                        <Link
                            onClick={() => {
                                cancelEdit();
                            }}
                        >
                            Cancel
                        </Link>
                        <Link onClick={() => saveChangedName()}>Save</Link>
                    </>
                ) : (
                    <>
                        <Link
                            onClick={() => {
                                setIsEditing(true);
                            }}
                        >
                            Edit
                        </Link>
                        <Link onClick={() => deleteTask()}>Delete</Link>
                    </>
                )}

               
            </div>
        </div>
    );
}

export default TaskRow;
