import React,{useEffect,useState} from "react";
import MainCalendar from "../../Components/Organiser/MainCalendar";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";

function OrganiserPage(props) {
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const [loading,setLoading] = useState(true)
    const [userId,setUserId] = useState(null) 
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                // setLoggedIn(true);
                // console.log(result.data)
                setUserId(result.data.id)
                console.log("Logged in");
                setLoading(false)
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            {loading?<>Loading ...</>:<><MainCalendar userId = {userId}/></>}
        </div>
    );
}

export default OrganiserPage;
