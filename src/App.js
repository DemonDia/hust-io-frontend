import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// ================================context================================
import { mainContext } from "./Contexts/mainContext";
// ================================navbar================================
import Navbar from "./Components/General/Navbar";
// ================================authentication================================
import EmailVerificationPage from "./Pages/Authentication/EmailVerificationPage";
import SendResetPasswordRequest from "./Pages/Authentication/SendResetPasswordRequest";
import ForgotPasswordFormPage from "./Pages/Authentication/ForgotPasswordFormPage";
import LoginPage from "./Pages/Authentication/LoginPage";
import RegistrationPage from "./Pages/Authentication/Registration";

// ================================home================================
import HomePage from "./Pages/Home/HomePage";

// ================================organiser================================
import OrganiserPage from "./Pages/Organiser/OrganiserPage";
import CurrentDatePage from "./Pages/Organiser/CurrentDatePage";

// ================================event================================
import EventListPage from "./Pages/Events/EventListPage";
import AddEventPage from "./Pages/Events/AddEventPage";
import EditEventPage from "./Pages/Events/EditEventPage";

// ================================tasks================================
import TaskListPage from "./Pages/Tasks/TaskListPage";

// ================================journal================================
import JournalListPage from "./Pages/Journal/JournalListPage";
import AddJournalPage from "./Pages/Journal/AddJournalPage";
import ViewJournalEntryPage from "./Pages/Journal/ViewJournalEntryPage";

// ================================quiz================================
import QuizListPage from "./Pages/Quiz/QuizListPage";
import AddQuizPage from "./Pages/Quiz/AddQuizPage";
import EditQuizPage from "./Pages/Quiz/EditQuizPage";

// ================================quiz attempt================================
import CreateQuizAttempt from "./Pages/QuizAttempt/CreateQuizAttempt";
import QuizAttemptPage from "./Pages/QuizAttempt/QuizAttemptPage";

// ================================user profile================================
import UserProfile from "./Pages/Users/UserProfile";

// ================================redirects================================
import ErrorPage from "./Pages/Redirects/ErrorPage";
import RedirectPage from "./Pages/Redirects/RedirectPage";
import LogoutPage from "./Pages/Redirects/LogoutPage";

function App() {
    const [userId, setUserId] = useState(null);
    return (
        <BrowserRouter>
            <div className="App">
                <mainContext.Provider value={{ userId, setUserId }}>
                    <Navbar userId={userId}/>
                    <div className="pageContainer">
                        <Routes>
                            {/* ================================authentication================================  */}
                            <Route
                                exact
                                path="/login"
                                element={<LoginPage />}
                            />
                            <Route
                                exact
                                path="/register"
                                element={<RegistrationPage />}
                            />
                            <Route
                                exact
                                path="/login"
                                element={<LoginPage />}
                            />
                            <Route
                                exact
                                path="/verify/:userId/:token"
                                element={<EmailVerificationPage />}
                            />
                            <Route
                                exact
                                path="/forgotpass"
                                element={<SendResetPasswordRequest />}
                            />
                            <Route
                                exact
                                path="/resetpass/:userId/:token"
                                element={<ForgotPasswordFormPage />}
                            />

                            {/* ================================home================================  */}
                            <Route exact path="/home" element={<HomePage />} />

                            {/* ================================organiser================================  */}
                            <Route
                                exact
                                path="/organiser"
                                element={<OrganiserPage />}
                            />
                            <Route
                                exact
                                path="/organiser/:currDate"
                                element={<CurrentDatePage />}
                            />

                            {/* ================================event================================  */}
                            <Route
                                exact
                                path="/events"
                                element={<EventListPage />}
                            />
                            <Route
                                exact
                                path="/events/add"
                                element={<AddEventPage />}
                            />
                            <Route
                                exact
                                path="/events/:eventId"
                                element={<EditEventPage />}
                            />
                            {/* ================================tasks================================  */}
                            <Route
                                exact
                                path="/tasks"
                                element={<TaskListPage />}
                            />

                            {/* ================================journal================================  */}
                            <Route
                                exact
                                path="/journals"
                                element={<JournalListPage />}
                            />
                            <Route
                                exact
                                path="/journals/add"
                                element={<AddJournalPage />}
                            />
                            <Route
                                exact
                                path="/journals/:journalId"
                                element={<ViewJournalEntryPage />}
                            />

                            {/* ================================quiz================================  */}
                            <Route
                                exact
                                path="/quizzes"
                                element={<QuizListPage />}
                            />
                            <Route
                                exact
                                path="/quizzes/add"
                                element={<AddQuizPage />}
                            />
                            <Route
                                exact
                                path="/quizzes/:quizId"
                                element={<EditQuizPage />}
                            />

                            {/* ================================quiz attempt================================  */}
                            <Route
                                exact
                                path="/quizzes/attempt/add/:quizId"
                                element={<CreateQuizAttempt />}
                            />
                            <Route
                                exact
                                path="/quizzes/attempt/:quizAttemptId"
                                element={<QuizAttemptPage />}
                            />

                            {/* ================================user profile================================  */}
                            <Route
                                exact
                                path="/profile"
                                element={<UserProfile />}
                            />

                            {/* ================================redirects================================  */}
                            <Route exact path="/" element={<RedirectPage />} />
                            <Route exact path="*" element={<ErrorPage />} />
                            <Route
                                exact
                                path="/logout"
                                element={<LogoutPage />}
                            />
                        </Routes>
                    </div>
                </mainContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
