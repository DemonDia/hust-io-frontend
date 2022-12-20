import React, { useState } from "react";
import { Link } from "react-router-dom";

function QuestionForm({ addQuestionFunction }) {
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [questionType, setQuestionType] = useState(1);
    const [explanation, setExplanation] = useState("");
    const addQuestion = () => {
        if (question.length > 130) {
            alert("Question cannot exceed 130 characters");
        } else if (question.length == 0) {
            alert("Question cannot be empty");
        } else if (correctAnswer.length > 130) {
            alert("Correct answer cannot exceed 130 characters");
        } else if (question.length == 0) {
            alert("Correct answer cannot be empty");
        } else if (explanation.length > 300) {
            alert("Explanation cannot exceed 300 characters");
        } else {
            const questionObject = {
                question,
                correctAnswer,
                question,
                explanation,
            };
            addQuestionFunction(questionObject);
            setQuestion("")
            setCorrectAnswer("")
            setExplanation("")
        }
    };
    return <div></div>;
}

export default QuestionForm;
