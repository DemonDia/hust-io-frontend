import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectAuthCheck } from '../../AuthCheck';

const RedirectPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        redirectAuthCheck(navigate)
    })
    return (
        <div>
            <div className="authForm container">
                <h1 className='title'>Redirecting ...</h1>
            </div>
        </div>
    );
};

export default RedirectPage;