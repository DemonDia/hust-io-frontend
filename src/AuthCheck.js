import axios from "axios";
axios.defaults.withCredentials = true;
const checkAuthStatus = async (successRoute, failRoute, navigate, axiosMgr) => {
    const res = await axios
        .get(process.env.REACT_APP_BACKEND_API + "/users/me", {
            withCredentials: true,
        })
        .catch((err) => {
            if (failRoute !== "") {
                navigate(failRoute);
            }
        });
    // console.log(res.stauts)
    if (successRoute !== "" && res.status == 200) {
        navigate(successRoute);
    } else if (failRoute !== "" && res.status != 200) {
        navigate(failRoute);
    }
    return res;
};

const loginPageAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "", navigate, axios);
};

const defaultAuthCheck = async (navigate) => {
    return await checkAuthStatus("", "/login", navigate, axios);
};

const redirectAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "/login", navigate, axios);
};

export { loginPageAuthCheck, defaultAuthCheck, redirectAuthCheck };
