import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { mainContext } from "../../Contexts/mainContext";
import QuizAttemptQuestion from "../../Components/QuizAttempt/QuizAttemptQuestion";

function QuizAttemptPage(props) {
    const { setUserId } = useContext(mainContext);
    const { quizAttemptId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [quizAttempt, setQuizAttempt] = useState(null);
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
    const handleMarking = (isCorrectStatus,index)=>{
        quizAttempt.questions[index].isCorrect = isCorrectStatus;
    }

    // ==========handlers==========
    // handle submission (finish submitting)
    const submitQuiz = async () => {
        if (quizAttempt.attemptStatus == 1) {
            const confirmSubmit = prompt("Type 'ok' to submit");
            if (confirmSubmit == "ok") {
                quizAttempt.attemptStatus = 2;
                await editQuizAttempt();
                alert("Submitted")
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
                alert("Submitted")
            }
        }
    };
    return (
        <div>
            <h1 className="title">Quiz Attempt</h1>
            <Link to="/quizzes">Back</Link>
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    <div>
                        <h2 className="title is-4"> {quizAttempt.quizName}</h2>
                        <h3 className="subtitle">
                            Attempted at: {quizAttempt.isoDate}
                        </h3>
                        <h3 className="subtitle">
                            Completion Status:{" "}
                            {statuses[quizAttempt.attemptStatus]}
                            {
                                quizAttempt.attemptStatus == 3?<>
                                (Score: {quizAttempt.quizScore}/{quizAttempt.noOfQuestions})
                                </>:<></>
                            }
                        </h3>
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
                    </div>
                </>
            )}
        </div>
    );
}

export default QuizAttemptPage;
