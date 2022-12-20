import React, { useEffect, useState, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizList from "../../Components/Quiz/QuizList";
import { mainContext } from "../../Contexts/mainContext";

function QuizListPage(props) {
    const currentToken = localStorage.getItem("loginToken");
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
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
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);
                await loadUserQuizzes(result.data.id);
                setLoading(false);
            }
        });
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
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <h1 className="title">All Quizzes</h1>
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    <QuizList Contents={quizzes} DeleteContent={deleteQuiz} />
                </>
            )}
        </div>
    );
}

export default QuizListPage;
