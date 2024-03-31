import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,  
    headers: {
        'Content-Type': 'application/json' // Example header
    }
});

export const login = async (credentials) => {
    try {
        const response = await instance.post('/api/users/login', credentials);
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};


export const makeRequest = async (method, url, data = null) => {
    try {
        let headers = {
            'Content-Type': 'application/json'
        };

        const token = Cookies.get('token');
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        const response = await instance.request({
            method,
            url,
            data,
            headers
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Other API functions can be added here
