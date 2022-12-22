import React, { useEffect, useState, useContext } from "react";
import OptionBox from "../../Components/Home/OptionBox";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../../Contexts/mainContext";
import Breadcrumbs from "../../Components/General/Breadcrumbs";

function HomePage(props) {
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                const { id, name } = result.data;
                setUserId(id);
                setName(name)
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth();
                const day = today.getDate();
                const dateString = `${year}-${month + 1}-${day}`;
                const options = [
                    { name: "Today", link: `/organiser/${dateString}` },
                    { name: "Organiser", link: "/organiser" },
                    { name: "Events", link: "/events" },
                    { name: "Journal", link: "/journals" },
                    { name: "Tasks", link: "/tasks" },
                    { name: "Quizzes", link: "/quizzes" },
                    { name: "User Profile", link: "/profile" },
                    { name: "Logout", link: "/logout" },
                ];
                var dividedOptions = [];
                var noOfBoxes = Math.ceil(options.length / 4);

                for (var i = 0; i < noOfBoxes; i++) {
                    dividedOptions.push([]);
                }
                // break down into 4
                // 4n - 1 --> 0, 3 , 7 --> 1,4,8
                var optionIndex = 0;
                var boxIndex = 0;
                options.map((option) => {
                    // next box
                    dividedOptions[boxIndex].push(option);
                    optionIndex += 1;
                    if (optionIndex % 4 == 0) {
                        boxIndex += 1;
                    }
                });

                setOptions(dividedOptions);
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <Breadcrumbs links={[{ text: "Home" }]} />
            <h1 className="title is-2">Welcome, <em id="currUserName">{name}</em>.</h1>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {options.map((optionList, index) => {
                        return (
                            <div className="columns" key={index}>
                                {optionList.map((option, index) => {
                                    return (
                                        <OptionBox
                                            key={index}
                                            option={option}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default HomePage;
