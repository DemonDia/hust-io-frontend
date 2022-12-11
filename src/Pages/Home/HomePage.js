import React from "react";
import OptionBox from "../../Components/Home/OptionBox";
function HomePage(props) {
    const options = [
        { name: "Organiser", link: "/organiser" },
        { name: "Events", link: "/events" },
        { name: "Journal", link: "/journals" },
        { name: "Tasks", link: "/tasks" },
        { name: "Logout", link: "/logout" },
    ];
    return (
        <div>
            <h1>Home Page</h1>
            <div className="columns">
                {options.map((option, index) => {
                    return <OptionBox key={index} option={option} />;
                })}
            </div>
        </div>
    );
}

export default HomePage;
