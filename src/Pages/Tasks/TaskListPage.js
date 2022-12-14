import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskList from "../../Components/Tasks/TaskList"

function TaskListPage(props) {
    const currentToken = localStorage.getItem("loginToken");
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
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
                setUserId(result.data.id);
                // get tasks
                await loadUserTasks(result.data.id);
                setLoading(false);
            }
        });
    };
    const deleteTask = async (eventId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/tasks/${eventId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
                data: {
                    userId,
                },
            })
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserTasks(userId);
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
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    <TaskList
                        Contents={tasks}
                        RefreshContents={loadUserTasks}
                        DeleteContent={deleteTask}
                        userId={userId}
                    />
                </>
            )}
        </div>
    );
}

export default TaskListPage;