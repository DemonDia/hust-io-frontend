import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function CurrentDatePage(props) {
    const currentToken = localStorage.getItem("loginToken");
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const { currDate } = useParams();
    const [currTab, setCurrTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [events, setEvents] = useState([]);
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
    // add,edit,delete --> return success/failure?
    
    // =====================events=====================
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
        console.log(getEventResults.data);
        if (getEventResults.data.success) {
            console.log(getEventResults.data.data);
            setEvents(getEventResults.data.data);
        }
    };
    // ============add event============
    // ============edit event============
    // ============delete event============

    // =====================journal=====================
    // ============load journal============
    // ============add journal============
    // ============edit journal============
    // ============delete journal============

    // =====================tasks=====================
    // ============load tasks============
    // ============add tasks============
    // ============edit tasks============
    // ============delete tasks============

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
                {loading ? <>Loading</> : <>Loaded</>}
            </div>
        </div>
    );
}

export default CurrentDatePage;
