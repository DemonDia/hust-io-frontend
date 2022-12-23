import React, { useState, useEffect, useContext } from "react";
import QuizForm from "../../Components/Quiz/QuizForm";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { mainContext } from "../../Contexts/mainContext";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function EditQuizPage() {
    const { setUserId } = useContext(mainContext);
    const { quizId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setCurrUserId(result.data.id);
                setUserId(result.data.id);
                await getCurrentQuiz();
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    // =================methods=================
    const getCurrentQuiz = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + `/quizzes/id/${quizId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
            })
            .then((res) => {
                if (res.data.success) {
                    setQuiz(res.data.data);
                }
            })
            .catch((err) => {});
    };
    const editQuiz = async (updatedQuiz) => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + `/quizzes/${quizId}`,
                {
                    ...updatedQuiz,
                    userId: currUserId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully updated");
                    navigate("/quizzes");
                } else {
                    alert("Failed to update");
                }
            })
            .catch((err) => {
                alert("Failed to update");
            });
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
                        text: "Edit Quiz",
                    },
                ]}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <QuizForm
                        proceedFunction={editQuiz}
                        currentQuiz={quiz}
                        heading={"Edit Quiz"}
                    />
                </>
            )}
        </div>
    );
}

export default EditQuizPage;
