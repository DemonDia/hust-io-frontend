import React,{useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultAuthCheck } from '../../AuthCheck';
function LogoutPage(props) {
    const navigate = useNavigate();
    // const { setLoggedIn } = useContext(NavbarContext);
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                // setLoggedIn(false);
                // remove localstorage items
                localStorage.clear();
                navigate("/login");
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <h1 className='title'>Logging out ...</h1>
        </div>
    );
}

export default LogoutPage;