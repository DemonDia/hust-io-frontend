import axios from "axios";
const checkAuthStatus = async (successRoute, failRoute, navigate, axiosMgr) => {
    const currentToken = localStorage.getItem("loginToken");
    const authStatus = await axiosMgr
        .get(process.env.REACT_APP_BACKEND_API + "/users/me", {
            headers: { Authorization: `Bearer ${currentToken}` },
        })
        .then()
        .catch((err) => {
            if (failRoute !== "") {
                navigate(failRoute);
            }
        });
    if (successRoute !== "" && authStatus.data.success) {
        navigate(successRoute);
    } else if (failRoute !== "" && !authStatus.data.success) {
        navigate(failRoute);
    }
    console.log(authStatus)
    return authStatus;
};

const loginPageAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "", navigate, axios);
};

const defaultAuthCheck = async (navigate) => {
    return await checkAuthStatus("", "/login", navigate,axios);
};

const redirectAuthCheck = async (navigate) => {
    return await checkAuthStatus("/home", "/login", navigate, axios);
};

export { loginPageAuthCheck, defaultAuthCheck, redirectAuthCheck };
