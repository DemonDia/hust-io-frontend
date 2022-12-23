import React, { useEffect, useState, useContext } from "react";
import MainCalendar from "../../Components/Organiser/MainCalendar";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../../Contexts/mainContext";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function OrganiserPage() {
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                setCurrUserId(result.data.id);
                setUserId(result.data.id);
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    { text: "Organiser" },
                ]}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MainCalendar userId={currUserId} />
                </>
            )}
        </div>
    );
}

export default OrganiserPage;
