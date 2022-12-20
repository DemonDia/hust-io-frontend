import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionRow from "./QuestionRow";
function QuizForm({ proceedFunction, currentQuiz, heading }) {
    // =====================quiz=====================
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([]);

    // ==========add quiz==========
    const proceed = async () => {
        await proceedFunction({
            quizName,
            questions,
        });
    };

    // =====================question=====================
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [questionType, setQuestionType] = useState(1);
    const [explanation, setExplanation] = useState("");

    // ==========add question==========
    const addQuestion = (questionObject) => {
        if (question.length > 130) {
            alert("Question cannot exceed 130 characters");
        } else if (question.length == 0) {
            alert("Question cannot be empty");
        } else if (correctAnswer.length > 130) {
            alert("Correct answer cannot exceed 130 characters");
        } else if (correctAnswer.length == 0) {
            alert("Correct answer cannot be empty");
        } else if (explanation.length > 300) {
            alert("Explanation cannot exceed 300 characters");
        } else {
            const questionObject = {
                question,
                correctAnswer,
                questionType,
                explanation,
            };
            questions.push(questionObject);
            setQuestion("");
            setCorrectAnswer("");
            setExplanation("");
        }
    };
    // ==========update question==========

    // ==========delete question==========
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
                <div className="field questionField">
            <div className="control">
                <label className="label">Question:*</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Add new question"
                    value={question}
                    onChange={(e) => {
                        setQuestion(e.target.value);
                    }}
                />
            </div>
            <div className="control">
                <label className="label">Answer:*</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Add correct answer"
                    value={correctAnswer}
                    onChange={(e) => {
                        setCorrectAnswer(e.target.value);
                    }}
                />
            </div>
            <div className="control">
                <label className="label">Explanation:</label>
                <textarea
                    className="textarea"
                    placeholder="Add an explanation"
                    value={explanation}
                    onChange={(e) => {
                        setExplanation(e.target.value);
                    }}
                />
            </div>
            <div className="control">
                <button
                    className="button authBtn"
                    onClick={() => {
                        addQuestion();
                    }}
                >
                    Add Question
                </button>
            </div>
        </div>
                {questions.map((question, index) => {
                    return (
                        <QuestionRow
                            questionObject={question}
                            questionIndex={index}
                            deleteQuestionFunction={deleteQuestion}
                        />
                    );
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
