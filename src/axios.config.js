import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_APP_URL,
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // TODO : handle unauthorized actions ( redirect to login )
    return Promise.reject(error);
});

export default http