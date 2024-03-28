import { login } from '../utils/api.util';
import { makeRequest } from '../utils/api.util';

export const loginUser = async (credentials) => {
    try {
        const response = await login(credentials);
        // Handle successful login response
        return response;
    } catch (error) {
        throw error;
    }
};


export const registerUser = async (userData) => {
    try {
        const response = await makeRequest('post', 'api/users/register', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

// Other authentication-related functions can be added here
