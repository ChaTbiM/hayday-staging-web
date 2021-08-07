import jwt from 'jsonwebtoken'

const TOKEN = "access_token"

const getStoredUser = () => {
    const token = getStoredToken();
    const decoded = jwt.verify(token,"secretKey")
    return decoded.user
}


const getStoredToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN));
}


const getAuthHeader = () => {
    const token = getStoredToken();
    if (token) {
        return { 'Authorization': `Bearer ${token}` };
    } else {
        return {};
    }
}

export { getAuthHeader, getStoredToken, getStoredUser, TOKEN };
