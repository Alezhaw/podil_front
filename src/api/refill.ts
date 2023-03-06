import axios from './axios';
import { getConfig } from './axios';

export const axiosCreateRefill = async (id: number, score: number, user: string, creatorEmail: string, creatorPassword: string) => {
    const time = new Date().toLocaleString().replaceAll(',', '');
    try {
        const { data } = await axios.post('api/refill/create', { id, time, score, user, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosUpdateRefill = async (id: number, time: string, score: number, status: number, uniqueId: number, userEmail: string, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/refill/update', { id, time, score, status, uniqueId, userEmail, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetAllRefills = async () => {
    try {
        const { data } = await axios.get('api/refill/getAll', getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetUserRefills = async (email: string) => {
    try {
        const { data } = await axios.post('api/refill/getUsersRefills', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetRefill = async (id: number) => {
    try {
        const { data } = await axios.post('api/refill/getOne', { id }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosDeleteRefill = async (uniqueId: number, creatorEmail: string, creatorPassword: string) => {
    const { data } = await axios.post('api/refill/delete', { uniqueId, creatorEmail, creatorPassword }, getConfig());

    return data;
};
