import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// ================================authentication================================
import EmailVerificationPage from "./Pages/Authentication/EmailVerificationPage";
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

// ================================tasks================================
import TaskListPage from "./Pages/Tasks/TaskListPage";

// ================================journal================================
import JournalListPage from "./Pages/Journal/JournalListPage";

// ================================redirects================================
import ErrorPage from "./Pages/Redirects/ErrorPage";
import RedirectPage from "./Pages/Redirects/RedirectPage";
import LogoutPage from "./Pages/Redirects/LogoutPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="pageContainer">
                    <Routes>
                        {/* ================================authentication================================  */}
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route
                            exact
                            path="/register"
                            element={<RegistrationPage />}
                        />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route
                            exact
                            path="/verify/:userId/:token"
                            element={<EmailVerificationPage />}
                        />
                        <Route
                            exact
                            path="/forgotpass"
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

                        {/* ================================tasks================================  */}
                        <Route exact path="/tasks" element={<TaskListPage />} />

                        {/* ================================journal================================  */}
                        <Route
                            exact
                            path="/journals"
                            element={<JournalListPage />}
                        />

                        {/* ================================redirects================================  */}
                        <Route exact path="/" element={<RedirectPage />} />
                        <Route exact path="*" element={<ErrorPage />} />
                        <Route exact path="/logout" element={<LogoutPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
