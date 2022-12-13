import React,{useEffect} from "react";
import OptionBox from "../../Components/Home/OptionBox";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
    const options = [
        { name: "Organiser", link: "/organiser" },
        { name: "Events", link: "/events" },
        { name: "Journal", link: "/journals" },
        { name: "Tasks", link: "/tasks" },
        { name: "Logout", link: "/logout" },
    ];
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                // setLoggedIn(true);
                console.log("Logged in")
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
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
