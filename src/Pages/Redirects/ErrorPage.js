import React,{useContext,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../../Contexts/mainContext";
import {defaultAuthCheck} from "../../AuthCheck"
function ErrorPage(props) {
    const { setUserId } = useContext(mainContext);

    const navigate = useNavigate()
    const loadPage = async()=>{
        await defaultAuthCheck(navigate).then((res)=>{
            if(res.data.success){
                setUserId(res.data.id)
            }
        })
    }
    useEffect(()=>{
        loadPage()
    })
    return (
        <div>
            <div className="authForm container">
                <h1 className="title">Hello, there is nothing to look here.</h1>
                <Link to="/" type="button" className="button cancelAuthBtn">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage
