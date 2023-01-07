import React, { useEffect, useState } from "react";
import OptionBox from "../../Components/Home/OptionBox";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function HomePage() {
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loadPage = (result) => {
        if (result.status == 200) {
            dispatch(authActions.login());
            const { _id: id, existingUser } = result.data;
            const { name } = existingUser;
            setName(name);
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
    };

    const firstTimeLoad = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            loadPage(result);
        });
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            firstTimeLoad();
        }
        let interval = setInterval(() => {
            checkRefresh().then((result) => loadPage(result));
        }, 1000 * 29);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Breadcrumbs links={[{ text: "Home" }]} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {" "}
                    <div className="card homeContainer">
                        <h1 className="title is-2">
                            Welcome, <em id="currUserName">{name}</em>.
                        </h1>
                        <div className="">
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
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
