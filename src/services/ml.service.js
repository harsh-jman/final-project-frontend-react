import { login } from '../utils/api.util';
import { makeRequestML } from '../utils/MLapi.util';

export const recommend = async (userData) => {
    try {
        const response = await makeRequestML('post', '/output', userData);
        return response;
    } catch (error) {
        throw error;
    }
};