import React, { useState, useEffect } from "react";
import Banner from "../../Components/Authentication/Banner";
import RegistrationForm from "../../Components/Authentication/RegistrationForm";
function Registration(props) {
    return (
        <div className="columns">
            <Banner />
            <RegistrationForm/>
        </div>
    );
}

export default Registration;
