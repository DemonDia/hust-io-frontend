import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionRow from "./QuestionRow";
import QuestionForm from "./QuestionForm";
function QuizForm({ proceedFunction, currentQuiz, heading }) {
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([]);

    // =====================add quiz=====================
    const proceed = async () => {
        await proceedFunction({
            quizName,
            questions,
        });
    };

    // =====================add question=====================
    const addQuestion = (questionObject) => {
        questions.push(questionObject);
    };
    // =====================update question=====================

    // =====================delete question=====================
    const deleteQuestion = (questionToDelete) => {
        const updatedQuestions = questions.filter((currQuestion) => {
            return !(
                questionToDelete.question == currQuestion.question &&
                questionToDelete.correctAnswer == currQuestion.correctAnswer &&
                questionToDelete.questionType == currQuestion.questionType &&
                questionToDelete.explanation == currQuestion.explanation
            );
        });
        setQuestions(updatedQuestions);
    };
    return (
        <div className="formContainer container">
            <h1 className="title">{heading}</h1>
            <div className="container">
                <div className="field">
                    <div className="control">
                        <label className="label">Quiz Name:</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter journal entry title"
                            value={quizName}
                            onChange={(e) => {
                                setQuizName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <QuestionForm addQuestionFunction={addQuestion} />
                {questions.map((question, index) => {
                    return<QuestionRow questionObject={question} questionIndex={index}
                    deleteQuestionFunction={deleteQuestion}/>
                })}

                <button
                    className="button authBtn"
                    onClick={() => {
                        proceed();
                    }}
                >
                    {currentQuiz ? <>Save</> : <>Add</>}
                </button>

                <Link className="button cancelBtn" to="/journals">
                    {currentQuiz ? <>Back</> : <>Cancel</>}
                </Link>
            </div>
        </div>
    );
}

export default QuizForm;
