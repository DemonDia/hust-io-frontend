import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";

// =============events=============
import EventList from "../../Components/Events/EventList";
// =============journal=============
import JournalList from "../../Components/Journal/JournalList";

// =============tasks=============
import TaskList from "../../Components/Tasks/TaskList";

import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function CurrentDatePage() {
    const { currDate } = useParams();
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);

    const [currTab, setCurrTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const navigate = useNavigate();
    const tabs = ["Events", "Journal", "Tasks"];
    const loadPage = async () => {
        // load events, jounal, tasks
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
                // get events
                if (currDate) {
                    const [year, month, day] = currDate.split("-");
                    setYear(year);
                    setMonth(month);
                    setDay(day);
                    await loadDayEvents(year, month, day, id);
                    await loadDayJournalEntries(year, month, day, id);
                    await loadDayTasks(year, month, day, id);
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
            { withCredentials: true }
        );
        if (getEventResults.data.success) {
            setEvents(getEventResults.data.data);
        }
    };

    // ============delete events============
    const deleteEvent = async (eventId) => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API + `/events/${eventId}`,
                {
                    data: {
                        userId: currUserId,
                    },
                    withCredentials: true,
                }
            )
            .then(async (res) => {
                if (res.data.success) {
                    if (currDate) {
                        const [year, month, day] = currDate.split("-");
                        await loadDayEvents(year, month, day, currUserId);
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

    // =====================journal entries=====================
    const [journalEntries, setJournalEntries] = useState([]);
    // ============load journal entries============
    const loadDayJournalEntries = async (year, month, day, userId) => {
        const getJournalEntryResults = await axios.get(
            process.env.REACT_APP_BACKEND_API +
                `/journals/${year}/${month - 1}/${day}/${userId}`,
            { withCredentials: true }
        );
        if (getJournalEntryResults.data.success) {
            setJournalEntries(getJournalEntryResults.data.data);
        }
    };

        // ============delete journal entries============
        const deleteJournalEntry = async (journalId) => {
            await axios
                .delete(
                    process.env.REACT_APP_BACKEND_API + `/journals/${journalId}`,
                    {
                        data: {
                            userId: currUserId,
                        },
                        withCredentials: true,
                    }
                )
                .then(async (res) => {
                    if (res.data.success) {
                        if (currDate) {
                            const [year, month, day] = currDate.split("-");
                            await loadDayJournalEntries(year, month, day, currUserId);
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

    // =====================tasks=====================
    const [tasks, setTasks] = useState([]);
    // ============load tasks============
    const loadDayTasks = async (year, month, day, userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API +
                `/tasks/${year}/${month - 1}/${day}/${userId}`,
            { withCredentials: true }
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
                    userId: currUserId,
                },
                { withCredentials: true }
            )
            .then(async (res) => {
                if (res.data.success) {
                    await loadDayTasks(year, month, day, currUserId);
                    alert("Successfully added");
                } else {
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                alert("Failed to add");
            });
    };
    // ============edit task name============
    const editTaskName = async (taskName, taskId) => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + `/tasks/${taskId}`,
                {
                    taskName,
                    userId: currUserId,
                },
                { withCredentials: true }
            )
            .then(async (res) => {
                if (res.data.success) {
                    const [year, month, day] = currDate.split("-");
                    await loadDayTasks(year, month, day, currUserId);
                    alert("Successfully updated");
                } else {
                    alert("Failed to update");
                }
            })
            .catch((err) => {
                alert("Failed to update");
            });
    };
    // ============edit task status============
    const editTaskStatus = async (completed, taskId) => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API +
                    `/tasks/completion/${taskId}`,
                {
                    completed,
                    userId: currUserId,
                },
                { withCredentials: true }
            )
            .then(async (res) => {
                if (res.data.success) {
                    const [year, month, day] = currDate.split("-");
                    await loadDayTasks(year, month, day, currUserId);
                    alert("Successfully updated");
                } else {
                    alert("Failed to update");
                }
            })
            .catch((err) => {
                alert("Failed to update");
            });
    };

    // ============delete tasks============
    const deleteTask = async (eventId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/tasks/${eventId}`, {
                data: {
                    userId: currUserId,
                },
                withCredentials: true,
            })
            .then(async (res) => {
                if (res.data.success) {
                    if (currDate) {
                        const [year, month, day] = currDate.split("-");
                        await loadDayTasks(year, month, day, currUserId);
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
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home", isCurrent: false },
                    {
                        text: "Organiser",
                        linkDest: "/organiser",
                        isCurrent: false,
                    },
                ]}
            />
            <h1 className="title is-2">
                {" "}
                As of {day}-{month}-{year}:
            </h1>
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
                    <Loader />
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
                                    <JournalList
                                        Contents={journalEntries}
                                        DeleteContent={deleteJournalEntry}
                                    />
                                ) : (
                                    <>
                                        <TaskList
                                            AddContent={addNewTask}
                                            Contents={tasks}
                                            EditName={editTaskName}
                                            EditStatus={editTaskStatus}
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
