import React, { useEffect, useState, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizList from "../../Components/Quiz/QuizList";
import QuizAttemptList from "../../Components/QuizAttempt/QuizAttemptList";
import { mainContext } from "../../Contexts/mainContext";

function QuizListPage(props) {
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("loginToken");
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);
                await loadUserQuizzes(result.data.id);
                await loadUserQuizAttempts(result.data.id);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        loadPage();
    }, []);

    // ================tabs to toggle================
    const [tab, setTab] = useState(0);
    const tabs = ["Quizzes", "Quiz Attempts"];

    // ================quizzes================
    const [quizzes, setQuizzes] = useState([]);

    const loadUserQuizzes = async (userId) => {
        const getQuizResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/quizzes/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        if (getQuizResults.data.success) {
            setQuizzes(getQuizResults.data.data);
        }
    };

    const deleteQuiz = async (quizId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/quizzes/${quizId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
                data: {
                    userId: currUserId,
                },
            })
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserQuizzes(currUserId);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };

    // ================quiz attempts================
    const [quizAttempts, setQuizAttempts] = useState([]);

    const loadUserQuizAttempts = async (userId) => {
        const getQuizResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/quizAttempts/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        if (getQuizResults.data.success) {
            setQuizAttempts(getQuizResults.data.data);
        }
    };

    const deleteQuizAttempt = async (quizAttemptId) => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API +
                    `/quizAttempts/${quizAttemptId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                    data: {
                        userId: currUserId,
                    },
                }
            )
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserQuizAttempts(currUserId);
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
            <h1 className="title">Quiz Management</h1>
            <div className="tabs">
                <ul>
                    {tabs.map((tab, index) => {
                        return (
                            <li
                                className={index == tab ? "is-active" : ""}
                                key={index}
                            >
                                <a
                                    onClick={() => {
                                        setTab(index);
                                    }}
                                >
                                    {tab}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="tabContents"></div>
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    {tab == 0 ? (
                        <QuizList
                            Contents={quizzes}
                            DeleteContent={deleteQuiz}
                        />
                    ) : (
                        <QuizAttemptList
                            Contents={quizAttempts}
                            DeleteContent={deleteQuizAttempt}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default QuizListPage;
