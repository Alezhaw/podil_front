import axios from './axios';
import { getConfig } from './axios';

export const axiosCreateDeal = async (name: string, buyer: string, seller: string, sum: number, description: string, creator: string, buyerNickname?: string, sellerNickname?: string) => {
    try {
        const { data } = await axios.post('api/deal/create', { name, buyer, seller, sum, description: description, buyerNickname, sellerNickname, creator }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetDeal = async (email: string, password: string) => {
    const { data } = await axios.post('api/deal/getUserDeals', { email, password }, getConfig());

    return data;
};

export const axiosGetOneDeal = async (id: number) => {
    const { data } = await axios.post('api/deal/getOne', { id }, getConfig());

    return data;
};

export const axiosGetAllDeal = async () => {
    const { data } = await axios.get('api/deal/get', getConfig());

    return data;
};

export const axiosChangeDeal = async (id: number, name: string, sum: number, status: number, description: string, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/deal/update', { id, name, sum, status, description, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeDealStatus = async (id: number, status: number, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/deal/updateStatus', { id, status, email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteDeal = async (id: number, creatorEmail: string, creatorPassword: string) => {
    const { data } = await axios.post('api/deal/delete', { id, creatorEmail, creatorPassword }, getConfig());

    return data;
};
