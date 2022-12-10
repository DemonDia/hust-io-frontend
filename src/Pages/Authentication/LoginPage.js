import React from 'react';
import Banner from "../../Components/Authentication/Banner"
import LoginForm from '../../Components/Authentication/LoginForm';
function LoginPage(props) {
    return (
        <div className='columns'>
            <Banner/>
            <LoginForm/>
        </div>
    );
}

export default LoginPage;