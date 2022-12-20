import React, { useState } from "react";
import { Link } from "react-router-dom";

function QuestionRow({
    questionObject,
    questionIndex,
    updateQuestionFunction,
    deleteQuestionFunction,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [question, setQuestion] = useState(questionObject.question);
    const [correctAnswer,setCorrectAnswer] = useState(questionObject.correctAnswer)
    const [questionType,setQuestionType] = useState(questionObject.questionType)
    const [explanation,setExplanation] = useState(questionObject.explanation)
    const saveChanges = () => {
        if (question.length > 130) {
            alert("Question cannot exceed 130 characters");
        }
        else if(question.length == 0){
            alert("Question cannot be empty")
        }
        else if(correctAnswer.length > 130){
            alert("Correct answer cannot exceed 130 characters");
        } 
        else if(question.length == 0){
            alert("Correct answer cannot be empty")
        }
        else if(explanation.length > 300){
            alert("Explanation cannot exceed 300 characters");
        }
        else {
            const newQuestionObject = {
                question,correctAnswer,explanation
            }
            updateQuestionFunction(newQuestionObject, questionIndex);
            isEditing(false);
        }
    };
    const deleteRow = ()=>{
        deleteQuestionFunction(questionObject)
    }
    return <div></div>;
}

export default QuestionRow;
