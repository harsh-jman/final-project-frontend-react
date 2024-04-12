import { makeRequest } from '../utils/api.util';



export const getAllSkills = async () => {
    try {
        // Replace '/api/data' with your actual endpoint
        const response = await makeRequest('get', '/api/skills/allSkills');
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const addSkill = async (userData) => {
    try {
        const response = await makeRequest('post', 'api/skills/add-skill', userData);
        return response;
    } catch (error) {
        throw error;
    }
};


export const addUserSkills = async (userData) => {
    try {
        const response = await makeRequest('post', 'api/skills/addUserSkills', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserSkills = async (userData) => {
    try {
        const response = await makeRequest('get', 'api/skills/showUserSkills', userData);
        return response;
    } catch (error) {
        throw error;
    }
};


export const getUserDash = async (userData) => {
    try {
        const response = await makeRequest('get', 'api/users/getUserPersonalData', userData);
        return response;
    } catch (error) {
        throw error;
    }
};
