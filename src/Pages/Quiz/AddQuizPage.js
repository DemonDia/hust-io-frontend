import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import QuizForm from "../../Components/Quiz/QuizForm";
import { mainContext } from "../../Contexts/mainContext";

function AddQuizPage(props) {
    const { setUserId } = useContext(mainContext);
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);
                console.log("Logged in");
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
                { headers: { Authorization: `Bearer ${currentToken}` } }
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
            {loading ? (
                <>Loading...</>
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
