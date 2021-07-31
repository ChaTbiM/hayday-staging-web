
const TOKEN_KEY = "access_token"

const getStoredUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}


const getStoredToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
}


const getAuthHeader = () => {
    const token = getStoredToken();
    if (token) {
        return { 'Authorization': `JWT ${token}` };
    } else {
        return {};
    }
}

export { getAuthHeader, getStoredToken, getStoredUser, TOKEN_KEY };
