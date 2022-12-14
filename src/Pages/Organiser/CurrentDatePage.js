import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// =============events=============
import EventList from "../../Components/Events/EventList";
// =============journal=============

// =============tasks=============
import TaskList from "../../Components/Tasks/TaskList";
import TaskForm from "../../Components/Tasks/TaskForm";

function CurrentDatePage(props) {
    const currentToken = localStorage.getItem("loginToken");
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const { currDate } = useParams();
    const [currTab, setCurrTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const tabs = ["Events", "Journal", "Tasks"];
    const loadPage = async () => {
        // load events, jounal, tasks
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                // get events
                if (currDate) {
                    const [year, month, day] = currDate.split("-");
                    await loadDayEvents(year, month, day, result.data.id);
                    await loadDayTasks(year, month, day, result.data.id);
                }
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    // ===================================CRUD for events, journal, tasks===================================
    // =======================CRUD=======================
    // add,delete --> return success/failure?

    // =====================events=====================
    const [events, setEvents] = useState([]);
    // ============load event============
    const loadDayEvents = async (year, month, day, userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API +
                `/events/${year}/${month - 1}/${day}/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        if (getEventResults.data.success) {
            setEvents(getEventResults.data.data);
        }
    };
    // ============delete events============
    const deleteEvent = async (eventId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/events/${eventId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
                data: {
                    userId,
                },
            })
            .then(async (res) => {
                if (res.data.success) {
                    if (currDate) {
                        const [year, month, day] = currDate.split("-");
                        await loadDayEvents(year, month, day, userId);
                        alert("Successfully deleted");
                    }
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };

    // =====================journal=====================
    // ============load journal============
    // ============add journal============
    // ============delete journal============

    // =====================tasks=====================
    const [tasks, setTasks] = useState([]);
    // ============load tasks============
    const loadDayTasks = async (year, month, day, userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API +
                `/tasks/${year}/${month - 1}/${day}/${userId}`,
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
    // ============add task============
    const addNewTask = async (taskName) => {
        const [year, month, day] = currDate.split("-");
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/tasks/",
                {
                    taskName,
                    tags: [],
                    completed: false,
                    addedDate: {
                        year,
                        month: month - 1,
                        day,
                    },
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then(async (res) => {
                if (res.data.success) {
                    await loadDayTasks(year, month, day,userId);
                    alert("Successfully added");
                } else {
                    console.log(res.data.message);
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to add");
            });
    };

    // ============delete tasks============
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
                    if (currDate) {
                        const [year, month, day] = currDate.split("-");
                        await loadDayTasks(year, month, day, userId);
                        alert("Successfully deleted");
                    }
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };

    return (
        <div>
            <h1 className="title"> As of {currDate}</h1>
            <div className="tabs">
                <ul>
                    {tabs.map((tab, index) => {
                        return (
                            <li
                                className={index == currTab ? "is-active" : ""}
                                key={index}
                            >
                                <a
                                    onClick={() => {
                                        setCurrTab(index);
                                    }}
                                >
                                    {tab}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="tabContents">
                {loading ? (
                    <>Loading</>
                ) : (
                    <>
                        {currTab == 0 ? (
                            <>
                                <EventList
                                    Contents={events}
                                    DeleteContent={deleteEvent}
                                />
                            </>
                        ) : (
                            <>
                                {currTab == 1 ? (
                                    <>Journal Content</>
                                ) : (
                                    <>
                                        <TaskForm addTaskMethod={addNewTask} />
                                        <TaskList
                                            Contents={tasks}
                                            DeleteContent={deleteTask}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CurrentDatePage;
