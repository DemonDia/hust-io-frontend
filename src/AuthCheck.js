import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.withCredentials = true;
const checkAuthStatus = async (successRoute, failRoute, navigate) => {
    const cookies = new Cookies();
    const currCookie = cookies.get("currentUser")
    const res = await axios
        .get(process.env.REACT_APP_BACKEND_API + "/users/me", 
        {
            headers: { Authorization: `Bearer ${currCookie}` },
            withCredentials: true,
        })
        .catch((err) => {
            if (failRoute !== "") {
                navigate(failRoute);
            }
        });
    if (successRoute !== "" && res.status == 200) {
        navigate(successRoute);
    } else if (failRoute !== "" && res.status != 200) {
        navigate(failRoute);
    }
    return res;
};

const checkRefresh = async () => {
    const cookies = new Cookies();
    const currCookie = cookies.get("currentUser")
    console.log("currCookie",currCookie)
    const res = await axios.get(
        process.env.REACT_APP_BACKEND_API + "/users/refresh",
        
        {
            headers: { Authorization: `Bearer ${currCookie}` },
            withCredentials: true,
        }
    );
    const { token } = res.data;
    cookies.set("currentUser", token, {
        expires: new Date(Date.now() + 1000 * 30),
    });
    return res;
};

const loginPageAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "", navigate);
};

const defaultAuthCheck = async (navigate) => {
    return await checkAuthStatus("", "/login", navigate);
};

const redirectAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "/login", navigate);
};

export {
    loginPageAuthCheck,
    defaultAuthCheck,
    redirectAuthCheck,
    checkRefresh,
};
