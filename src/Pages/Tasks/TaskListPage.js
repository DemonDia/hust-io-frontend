import React, { useEffect, useState, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../../Components/Tasks/TaskList";
import { mainContext } from "../../Contexts/mainContext";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function TaskListPage() {
    const currentToken = localStorage.getItem("loginToken");
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const loadUserTasks = async (userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/tasks/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        if (getEventResults.data.success) {
            setTasks(getEventResults.data.data);
        }
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setCurrUserId(result.data.id);
                setUserId(result.data.id);
                // get tasks
                await loadUserTasks(result.data.id);
                setLoading(false);
            }
        });
    };

    const editTaskName = async (taskName, taskId) => {
        if(taskName.length > 20){
            alert("Your task name cannot exceed 20 characters!")
            await loadUserTasks(currUserId);
        }
        else{
            await axios
            .put(
                process.env.REACT_APP_BACKEND_API + `/tasks/${taskId}`,
                {
                    taskName,
                    userId: currUserId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(async (res) => {
                if (res.data.success) {
                    await loadUserTasks(currUserId);
                    alert("Successfully updated");
                } else {
                    alert("Failed to update");
                }
            })
            .catch((err) => {
                alert("Failed to update");
            });
        }
    };

    const editTaskStatus = async (completed, taskId) => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API +
                    `/tasks/completion/${taskId}`,
                {
                    completed,
                    userId: currUserId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(async (res) => {
                if (res.data.success) {
                    await loadUserTasks(currUserId);
                    alert("Successfully updated");
                } else {
                    alert("Failed to update");
                }
            })
            .catch((err) => {
                alert("Failed to update");
            });
    };
    const deleteTask = async (taskId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
                data: {
                    userId: currUserId,
                },
            })
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserTasks(currUserId);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Tasks",
                    },
                ]}
            />
            <h1 className="title is-2">All Tasks</h1>
            {loading ? (
               <Loader />
            ) : (
                <>
                    <TaskList
                        Contents={tasks}
                        EditName={editTaskName}
                        EditStatus={editTaskStatus}
                        DeleteContent={deleteTask}
                    />
                </>
            )}
        </div>
    );
}

export default TaskListPage;
