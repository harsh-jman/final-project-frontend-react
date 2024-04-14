import { makeRequestML } from '../utils/MLapi.util';

export const dataIngest = async () => {
    try {
        const response = await makeRequestML('get', '/ingest');
        return response;
    } catch (error) {
        throw error;
    }
};


export const mlTrain = async () => {
    try {
        const response = await makeRequestML('get', '/train');
        return response;
    } catch (error) {
        throw error;
    }
};


export const edaReport = async () => {
    try {
        const response = await makeRequestML('get', '/getEDA');
        return response;
    } catch (error) {
        throw error;
    }
};

export const edaReportView = async () => {
    try {
        const response = await makeRequestML('get', '/getEDAfile');
        return response;
    } catch (error) {
        throw error;
    }
};

export const dbtDocs = async () => {
    try {
        const response = await makeRequestML('get', '/dbtDocsGenerate');
        return response;
    } catch (error) {
        throw error;
    }
};

export const dbtDocsView = async () => {
    try {
        const response = await makeRequestML('get', '/dbtDocsGenerateFile');
        return response;
    } catch (error) {
        throw error;
    }
};

export const dbtRun = async () => {
    try {
        const response = await makeRequestML('get', '/dbtRun');
        return response;
    } catch (error) {
        throw error;
    }
};