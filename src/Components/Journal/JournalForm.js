import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function JournalForm({ proceedFunction, currentJournalEntry, heading }) {
    const [journalTitle, setJournalTitle] = useState("");
    const [journalContent, setJournalContent] = useState("");
    const [moodRating, setMoodRating] = useState(1);
    const [tags, setTags] = useState([]);

    // defaultDate is datetime now
    const [dateTime, setDateTime] = useState(null);
    const proceed = async () => {
        const submitDate = new Date();
        const year = submitDate.getFullYear();
        const month = submitDate.getMonth();
        const day = submitDate.getDate();
        const hour = submitDate.getHours();
        const minute = submitDate.getMinutes();
        const date = {
            year,
            month,
            day,
            hour,
            minute,
        };
        const currJournalEntry = {
            journalTitle,
            journalContent,
            moodRating,
            date,
            tags,
        };
        await proceedFunction(currJournalEntry);
    };
    const changeRatingHandler = (rating) => {
        if (rating > 5) {
            rating = 1;
        } else if (rating < 1) {
            rating = 5;
        }
        setMoodRating(rating);
    };
    useEffect(() => {
        if (currentJournalEntry) {
            const { journalTitle, journalContent, moodRating, date, tags } =
                currentJournalEntry;
            const { year, month, day, hour, minute } = date;
            const dateTime = `${day}-${month + 1}-${year}, ${
                hour == 0 ? "00" : hour
            }:${minute}`;
            setDateTime(dateTime);
            setJournalTitle(journalTitle);
            setJournalContent(journalContent);
            setMoodRating(moodRating);
            setTags(tags);
        }
    }, []);
    return (
        <div className="formContainer container card">
            <h1 className="title is-2">{heading}</h1>
            <div className="container">
                {currentJournalEntry ? (
                    <>
                        {" "}
                        <label className="label">
                            Published at: {dateTime}
                        </label>
                    </>
                ) : (
                    <></>
                )}
                <></>
                <div className="field">
                    <div className="control">
                        <label className="label">Journal Title:</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter journal entry title"
                            value={journalTitle}
                            disabled={currentJournalEntry}
                            onChange={(e) => {
                                setJournalTitle(e.target.value);
                            }}
                        />
                        <label className="label">Mood rating:</label>
                        <div id="ratingField">
                            <div className="control ratingChangeBtnContainer">
                                <button
                                    disabled={currentJournalEntry}
                                    className="button ratingChangeBtn"
                                    onClick={() => {
                                        changeRatingHandler(moodRating - 1);
                                    }}
                                >
                                    -
                                </button>
                            </div>
                            <div className="control">
                                <input
                                    className="input is-focused"
                                    type="text"
                                    placeholder="Focused input"
                                    value={moodRating}
                                    disabled
                                    // onChange={(e)=>{changeRatingHandler(e.target.value)}}
                                    style={{ background: "white" }}
                                />
                            </div>
                            <div className="control ratingChangeBtnContainer">
                                <button
                                    className="button ratingChangeBtn"
                                    disabled={currentJournalEntry}
                                    onClick={() => {
                                        changeRatingHandler(moodRating + 1);
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <label className="label">Journal Content:</label>
                        <textarea
                            disabled={currentJournalEntry}
                            className="textarea"
                            placeholder="Write up to 100 characters"
                            value={journalContent}
                            onChange={(e) => {
                                setJournalContent(e.target.value);
                            }}
                        />
                    </div>
                </div>
                {currentJournalEntry ? (
                    <></>
                ) : (
                    <>
                        {" "}
                        <button
                            className="button authBtn"
                            onClick={() => {
                                proceed();
                            }}
                        >
                            Add
                        </button>
                    </>
                )}
                <Link className="button cancelBtn" to="/journals">
                    {currentJournalEntry ? <>Back</> : <>Cancel</>}
                </Link>
            </div>
        </div>
    );
}

export default JournalForm;
