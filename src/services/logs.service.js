import { makeRequest } from '../utils/api.util';

export const getLogsData = async () => {
    try {
        const response = await makeRequest('get', '/api/log/getLog');
        return response;
    } catch (error) {
        throw error;
    }
};


export const makeLog = async (data) => {
    try {
        const response = await makeRequest('post', 'api/log/makeLog', data);
        return response;
    } catch (error) {
        throw error;
    }
};


