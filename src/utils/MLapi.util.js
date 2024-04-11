import axios from 'axios';
import Cookies from 'js-cookie';

const MLinstance = axios.create({
    baseURL: process.env.REACT_APP_ML_API_BASE_URL,  
    headers: {
        'Content-Type': 'application/json' // Example header
    }
});

export const makeRequestML = async (method, url, data = null) => {
    try {
        let headers = {
            'Content-Type': 'application/json'
        };

        const token = Cookies.get('token');
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        const response = await MLinstance.request({
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
