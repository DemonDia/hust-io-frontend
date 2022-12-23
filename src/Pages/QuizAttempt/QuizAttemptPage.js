import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { mainContext } from "../../Contexts/mainContext";
import QuizAttemptQuestion from "../../Components/QuizAttempt/QuizAttemptQuestion";
import Breadcrumbs from "../../Components/General/Breadcrumbs";

function QuizAttemptPage(props) {
    const { setUserId } = useContext(mainContext);
    const { quizAttemptId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [quizAttempt, setQuizAttempt] = useState(null);
    const [displayDate, setDisplayDate] = useState("");
    const navigate = useNavigate();

    const statuses = ["", "In progress", "Marking in progress", "Completed"];

    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);
                await getCurrentAttempt();
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        loadPage();
    }, []);
    // =================methods=================
    const getCurrentAttempt = async () => {
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API +
                    `/quizAttempts/id/${quizAttemptId}`,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    setQuizAttempt(res.data.data);
                    const { isoDate } = res.data.data;
                    const quizDate = new Date(isoDate);
                    const year = quizDate.getFullYear();
                    const month = quizDate.getMonth();
                    const day = quizDate.getDate();
                    var hour = quizDate.getHours();
                    if(hour <= 9){
                        hour = "0"+hour;
                    }
                    var minute = quizDate.getMinutes();
                    if(minute <= 9){
                        minute = "0"+minute;
                    }
                    var seconds = quizDate.getSeconds();
                    if(seconds <= 9){
                        seconds = "0"+seconds;
                    }

                    const displayDate = `${day}-${month + 1}-${year}, ${
                        hour == "0" ? "00" : hour
                    }:${minute == "0" ? "00" : minute}:${
                        seconds == "0" ? "00" : seconds
                    }`;
                    setDisplayDate(displayDate);
                }
            })
            .catch((err) => {});
    };
    // =============update=============
    // base function
    const editQuizAttempt = async () => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API +
                    `/quizAttempts/${quizAttemptId}`,
                {
                    ...quizAttempt,
                    userId: currUserId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    getCurrentAttempt();
                }
            })
            .catch((err) => {});
    };

    // autosave
    const handleAnswerChange = (newAnswer, index) => {
        quizAttempt.questions[index].userAnswer = newAnswer;
    };

    // mark answer
    const handleMarking = (isCorrectStatus, index) => {
        quizAttempt.questions[index].isCorrect = isCorrectStatus;
    };

    // ==========handlers==========
    // handle submission (finish submitting)
    const submitQuiz = async () => {
        if (quizAttempt.attemptStatus == 1) {
            const confirmSubmit = prompt("Type 'ok' to submit");
            if (confirmSubmit == "ok") {
                quizAttempt.attemptStatus = 2;
                await editQuizAttempt();
                alert("Submitted");
            }
        }
    };
    // handle marking (finish marking)
    const markQuiz = async () => {
        if (quizAttempt.attemptStatus == 2) {
            const confirmSubmit = prompt("Type 'ok' to confirm finish marking");
            if (confirmSubmit == "ok") {
                quizAttempt.attemptStatus = 3;
                await editQuizAttempt();
                alert("Submitted");
            }
        }
    };
    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Quizzes",
                        linkDest: "/quizzes",
                    },
                    {
                        text: "Quiz Attempt",
                    },
                ]}
            />
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    <div>
                        <div className="container quizAttemptQuestion card">
                            <h2 className="title is-2 is-spaced">
                                {" "}
                                {quizAttempt.quizName}
                            </h2>
                            <h3 className="subtitle">
                                Attempt Date: {displayDate}
                            </h3>
                            <h3 className="subtitle">
                                Status: {statuses[quizAttempt.attemptStatus]}
                            </h3>

                            {quizAttempt.attemptStatus == 3 ? (
                                <h3 className="subtitle">
                                    Score: {quizAttempt.quizScore}/
                                    {quizAttempt.noOfQuestions}
                                </h3>
                            ) : (
                                <></>
                            )}
                        </div>
                        {quizAttempt.questions.map((question, index) => {
                            return (
                                <QuizAttemptQuestion
                                    changeAnswer={handleAnswerChange}
                                    markAnswer={handleMarking}
                                    autoSaveAnswer={editQuizAttempt}
                                    attemptQuestion={question}
                                    questionIndex={index}
                                    key={index}
                                    attemptStatus={quizAttempt.attemptStatus}
                                />
                            );
                        })}
                        {quizAttempt.attemptStatus == 1 ? (
                            <>
                                <button
                                    className="button quizAttemptSubmitBtn"
                                    onClick={() => {
                                        submitQuiz();
                                    }}
                                >
                                    Submit
                                </button>
                            </>
                        ) : (
                            <>
                                {quizAttempt.attemptStatus == 2 ? (
                                    <>
                                        <button
                                            className="button quizAttemptSubmitBtn"
                                            onClick={() => {
                                                markQuiz();
                                            }}
                                        >
                                            Finish Marking
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                        <Link
                            className="button quizAttemptSubmitBtn cancelBtn"
                            to="/quizzes"
                        >
                            Back
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default QuizAttemptPage;
