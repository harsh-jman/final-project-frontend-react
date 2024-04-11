// import { login } from '../utils/api.util';
import { makeRequest } from '../utils/api.util';
// import Cookies from 'js-cookie';


export const approvalsForApprover = async () => {
    try {
        // Replace '/api/data' with your actual endpoint
        const response = await makeRequest('get', '/api/skills/approvalsForApprover');
        return response.approvals;
    } catch (error) {
        throw error;
    }
};


export const approveUserSkill = async (approvalDetail) => {
    try {
        // Replace '/api/skills/approveUserSkill' with your actual endpoint
        const response = await makeRequest('post', '/api/skills/approveUserSkill', approvalDetail);
        return response;
    } catch (error) {
        throw error;
    }
};
