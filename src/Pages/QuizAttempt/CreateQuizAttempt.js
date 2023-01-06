import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function CreateQuizAttempt() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [currUserId, setCurrUserId] = useState("");
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
                addNewQuizAttempt(id);
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
                { withCredentials: true }
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
            <Loader text={"Generating Quiz"} />
        </div>
    );
}

export default CreateQuizAttempt;
