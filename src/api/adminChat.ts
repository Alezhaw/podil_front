import axios from './axios';
import { getConfig } from './axios';

export const axiosGetAdminChats = async (adminEmail: string, adminPassword: string) => {
    try {
        const { data } = await axios.post('api/adminChat/get', { adminEmail, adminPassword }, getConfig());
        return data;
    } catch (e) {
        console.log(e);
    }
};
export const axiosGetOneChat = async (email: string, password: string) => {
    try {
        const { data } = await axios.post('api/adminChat/getOne', { email, password }, getConfig());
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosDeleteAdminChat = async (id: number, adminEmail: string, adminPassword: string) => {
    try {
        const { data } = await axios.post('api/adminChat/delete', { id, adminEmail, adminPassword }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosUpdateAdminChatRate = async (rate: number, email: string) => {
    try {
        const { data } = await axios.post('api/adminChat/rate', { rate, email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};
