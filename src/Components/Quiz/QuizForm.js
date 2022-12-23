import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const [selectedQustion, setSelectedQuestion] = useState(null);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);

    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [questionType, setQuestionType] = useState(1);
    const [explanation, setExplanation] = useState("");

    // ==========add question==========
    const addQuestion = () => {
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
    // ==========select question==========
    const selectQuestion = (index) => {
        if (index != -1) {
            setSelectedQuestion(questions[index]);
            setSelectedQuestionIndex(index);
            const { question, correctAnswer, explanation } = questions[index];
            setQuestion(question);
            setCorrectAnswer(correctAnswer);
            setExplanation(explanation);
        }
    };

    // ==========cancel select question==========
    const cancelSelectQuestion = () => {
        setSelectedQuestion(null);
        setSelectedQuestionIndex(-1);
        setQuestion("");
        setCorrectAnswer("");
        setExplanation("");
    };

    // ==========update question==========
    const updateQuestion = () => {
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
            questions[selectedQuestionIndex] = {
                question,
                correctAnswer,
                questionType,
                explanation,
            };
            cancelSelectQuestion();
        }
    };

    // ==========delete question==========
    const deleteQuestion = () => {
        const updatedQuestions = questions.filter((currQuestion) => {
            return !(
                selectedQustion.question == currQuestion.question &&
                selectedQustion.correctAnswer == currQuestion.correctAnswer &&
                selectedQustion.questionType == currQuestion.questionType &&
                selectedQustion.explanation == currQuestion.explanation
            );
        });
        cancelSelectQuestion();
        setQuestions(updatedQuestions);
    };

    useEffect(()=>{
        if(currentQuiz){
            const {quizName,questions} = currentQuiz
            setQuizName(quizName)
            setQuestions(questions)
        }
    })
    return (
        <div className="formContainer container card">
            <h1 className="title is-2">{heading}</h1>
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
                    {selectedQuestionIndex == -1 ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <div className="control">
                                <button
                                    className="button authBtn addButton"
                                    onClick={() => {
                                        updateQuestion();
                                    }}
                                >
                                    Save Question
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    className="button authBtn dangerButton"
                                    onClick={() => {
                                        deleteQuestion();
                                    }}
                                >
                                    Delete Question
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    className="button authBtn cancelBtn"
                                    onClick={() => {
                                        cancelSelectQuestion();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {questions.map((currQuestion, index) => {
                    const { question } =
                        currQuestion;
                    return (
                        <div key={index} className="questionRow columns card">
                            <div className="column">
                                <h1 className="subtitle">{question}</h1>
                            </div>
                            <div className="column selectLink">
                                <Link
                                    className="button is-link"
                                    onClick={() => {
                                        selectQuestion(index);
                                    }}
                                >
                                    Select
                                </Link>
                            </div>
                        </div>
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

                <Link className="button cancelBtn" to="/quizzes">
                    {currentQuiz ? <>Back</> : <>Cancel</>}
                </Link>
            </div>
        </div>
    );
}

export default QuizForm;
