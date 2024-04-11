import { login } from '../utils/api.util';
import { makeRequest } from '../utils/api.util';
import Cookies from 'js-cookie';

export const loginUser = async (credentials) => {
    try {
        const response = await login(credentials);
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

export const resetPassword = async (email, currentPassword, newPassword, confirmPassword) => {
    try {
        const response = await makeRequest('post', 'api/password/reset', {
            email,
            currentPassword,
            newPassword,
            confirmPassword
        });
        return response;
    } catch (error) {
        throw error;
    }
};


export const logoutUser = () => {
    // Clear cookies or any other storage used for authentication
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('username');
};


export const sendResetEmail = async (email) => {
    try {
        // Call the API to send the reset password email
        await makeRequest('post', '/api/password/forget', { email });
    } catch (error) {
        throw error;
    }
};


export const getUserData = async () => {
    try {
        // Replace '/api/data' with your actual endpoint
        const response = await makeRequest('get', '/api/data/user-data');
        return response.userData;
    } catch (error) {
        throw error;
    }
};

export const getAllUserData = async () => {
    try {
        // Replace '/api/data' with your actual endpoint
        const response = await makeRequest('get', '/api/data/fetch-all-data');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserDetails = async (userData) => {
    try {
        const response = await makeRequest('put', `/api/users/update`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (email) => {
    try {
        // Call the API to send the reset password email
        await makeRequest('delete', '/api/users/delete', { email });
    } catch (error) {
        throw error;
    }
};

// Other authentication-related functions can be added here
