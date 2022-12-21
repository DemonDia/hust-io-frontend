import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import { mainContext } from "../../Contexts/mainContext";

function QuizAttemptPage(props) {
    const { setUserId } = useContext(mainContext);
    const { quizId } = useParams();
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
    useEffect(() => {
        loadPage();
    }, []);
    
    return (
        <div>
            <h1 className="title">Quiz Attempt</h1>
            
        </div>
    );
}

export default QuizAttemptPage;