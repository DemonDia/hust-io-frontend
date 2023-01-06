import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import QuizForm from "../../Components/Quiz/QuizForm";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function AddQuizPage() {
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
                setLoading(false);
            }
        });
    };
    // =================methods=================
    const addNewQuiz = async (newQuiz) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/quizzes/",
                {
                    ...newQuiz,
                    userId: currUserId,
                },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully added");
                    navigate("/quizzes");
                } else {
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                alert("Failed to add");
            });
    };
    useEffect(() => {
        loadPage();
    }, []);
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
                        text: "New Quiz",
                    },
                ]}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <QuizForm
                        proceedFunction={addNewQuiz}
                        heading={"New Quiz"}
                    />
                </>
            )}
        </div>
    );
}

export default AddQuizPage;
