import React, { useState, useEffect } from "react";
import QuizForm from "../../Components/Quiz/QuizForm";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import axios from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";
import Cookies from "universal-cookie";

function EditQuizPage() {
    const cookies = new Cookies();
    const currentToken = cookies.get("currentUser");

    const { quizId } = useParams();
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const firstTimeLoad = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            loadPage(result);
        });
    };

    const loadPage = async (result) => {
        if (result.status == 200) {
            dispatch(authActions.login());
            const { _id: id } = result.data.existingUser;
            setCurrUserId(id);
            await getCurrentQuiz();
            setLoading(false);
        }
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            firstTimeLoad();
        }
        let interval = setInterval(() => {
            checkRefresh().then((result) => loadPage(result));
        }, 1000 * 10);
        return () => clearInterval(interval);
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
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
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
