import React, { useEffect, useState } from "react";
import MainCalendar from "../../Components/Organiser/MainCalendar";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function OrganiserPage() {
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
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
