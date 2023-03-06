import axios from './axios';
import { getConfig } from './axios';

export const axiosCreateDealMessages = async (dealId: number, nickname: string, email: string, message: string, role: string) => {
    try {
        const time = new Date().toLocaleString().replaceAll(',', '');
        const { data } = await axios.post('api/dealMessages/create', { dealId, nickname, email, message, time, role }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetDealMessages = async (dealId: number) => {
    try {
        const { data } = await axios.post('api/dealMessages/getDealMessages', { dealId }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};
