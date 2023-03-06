import axios from './axios';
import { getConfig } from './axios';

export const axiosGetName = async () => {
    try {
        const { data } = await axios.get('api/name/get');
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

export const axiosGetWallet = async () => {
    try {
        const { data } = await axios.get('api/name/getWallet');
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

export const axiosUpdateName = async (name: string, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/name/update', { name, email, password }, getConfig());
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

export const axiosUpdateWallet = async (wallet: string, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/name/updateWallet', { wallet, email, password }, getConfig());
        return data;
    } catch (error: any) {
        console.error(error);
    }
};
