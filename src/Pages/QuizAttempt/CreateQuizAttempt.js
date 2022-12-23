import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { mainContext } from "../../Contexts/mainContext";
import Loader from "../../Components/General/Loader";

function CreateQuizAttempt() {
    const { setUserId } = useContext(mainContext);
    const { quizId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                addNewQuizAttempt(result.data.id)
            }
        });
    };
        // =================methods=================
        const addNewQuizAttempt = async (userId) => {
            await axios
                .post(
                    process.env.REACT_APP_BACKEND_API + "/quizAttempts/",
                    {
                        quizId,
                        userId,
                    },
                    { headers: { Authorization: `Bearer ${currentToken}` } }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Successfully added");
                        navigate(`/quizzes/attempt/${res.data.data}`);
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
            <Loader text={"Generating Quiz"}/>
            
        </div>
    );
}

export default CreateQuizAttempt;