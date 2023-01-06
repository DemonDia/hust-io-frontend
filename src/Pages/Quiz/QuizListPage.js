import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizList from "../../Components/Quiz/QuizList";
import QuizAttemptList from "../../Components/QuizAttempt/QuizAttemptList";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function QuizListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
                await loadUserQuizzes(id);
                await loadUserQuizAttempts(id);
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
                withCredentials: true,
            }
        );
        if (getQuizResults.data.success) {
            setQuizzes(getQuizResults.data.data);
        }
    };

    const deleteQuiz = async (quizId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/quizzes/${quizId}`, {
                data: {
                    userId: currUserId,
                },
                withCredentials: true,
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
                withCredentials: true,
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
                    data: {
                        userId: currUserId,
                    },
                    withCredentials: true,
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
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Quizzes",
                    },
                ]}
            />
            <h1 className="title is-2">Quiz Management</h1>
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
            <div className="tabContents">
                {loading ? (
                    <Loader />
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
        </div>
    );
}

export default QuizListPage;
