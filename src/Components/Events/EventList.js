import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function EventList({ Contents, DeleteContent }) {
    // ============delete event============
    const deleteEvent = async (eventId) => {
        await DeleteContent(eventId);
    };
    return (
        <div className="listComponent">
            <div className="container">
                <h1 className="title">Event List</h1>
                <Link className="button button-link" to="/events/add">
                    Add
                </Link>
            </div>
            {Contents.length > 0 ? (
                <>
                    {Contents.map((content) => {
                        const { date, eventName, _id } = content;
                        const { year, month, day, hour, minute } = date;
                        return (
                            <div key={_id} className="listItem">
                                <div className="listItem-contents">
                                    <h5 className="subtitle">
                                        {eventName} -{" "}
                                        {`${year}/${month + 1}/${day} ${hour}:${
                                            minute == 0 ? "00" : minute
                                        }`}
                                    </h5>
                                </div>
                                <div className="listItem-buttons">
                                    <Link to={`/events/${_id}`}>Edit</Link>
                                    <Link onClick={() => deleteEvent(_id)}>
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <h2 class="title">Nothing here</h2>
            )}
        </div>
    );
}

export default EventList;
