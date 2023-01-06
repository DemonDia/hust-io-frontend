import React, { useState } from "react";

function QuizAttemptQuestion({
    changeAnswer,
    autoSaveAnswer,
    attemptQuestion,
    questionIndex,
    attemptStatus,
    markAnswer,
}) {
    const [isSaving, setIsSaving] = useState(false);
    const [isCorrect, setIsCorrect] = useState(attemptQuestion.isCorrect);
    const [newUserAnswer, setNewUserAnswer] = useState(
        attemptQuestion.userAnswer
    );
    const autoSave = async () => {
        setIsSaving(true);
        await autoSaveAnswer().then((res) => {
            setIsSaving(false);
        });
    };
    const handleChangeAnswer = (newAnswer, index) => {
        setNewUserAnswer(newAnswer);
        changeAnswer(newAnswer, index);
    };
    const handleChangeIsCorrect = (isCorrectStatus, index) => {
        setIsCorrect(isCorrectStatus);
        markAnswer(isCorrectStatus, index);
    };

    return (
        <div className="container quizAttemptQuestion card">
            <h3 className="title is-4">
                {questionIndex + 1}) {attemptQuestion.question}
            </h3>
            <textarea
                className="textarea"
                value={newUserAnswer}
                onBlur={() => {
                    autoSave();
                }}
                disabled={attemptStatus != 1}
                onChange={async (e) => {
                    await handleChangeAnswer(e.target.value, questionIndex);
                }}
            />
            {/* explanation */}
            {attemptStatus != 1 ? (
                        <>
                    <h3 className="title is-4">Correct Answer:</h3>
                    <p className="subtitle is-6">
                        {attemptQuestion.correctAnswer}
                    </p>
                    <br></br>
                    <h3 className="title is-4">Explanation:</h3>
                    <p className="subtitle is-6">
                        {attemptQuestion.explanation}
                    </p>
                </>
            ) : (
                <></>
            )}
            {attemptStatus != 1 ? (
                <>
                    <br></br>
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={isCorrect}
                            onChange={(e) => {
                                handleChangeIsCorrect(
                                    e.target.checked,
                                    questionIndex
                                );
                            }}
                            disabled={attemptStatus != 2}
                            onBlur={() => {
                                autoSave();
                            }}
                        />
                        Tick if answer is correct
                    </label>
                </>
            ) : (
                <></>
            )}

            {isSaving ? <>Saving ...</> : <></>}
        </div>
    );
}

export default QuizAttemptQuestion;
