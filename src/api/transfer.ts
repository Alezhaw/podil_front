import axios from './axios';
import { getConfig } from './axios';

export const axiosCreateUserTransfer = async (paymantSystem: string, walletNumber: string, score: number, userEmail: string, userNickname: string, password: string) => {
    try {
        const time = new Date().toLocaleString().replaceAll(',', '');
        const { data } = await axios.post('api/transfer/create', { paymantSystem, walletNumber, time, score, userEmail, userNickname, password }, getConfig());

        return data;
    } catch (e: any) {
        console.log(e);
        return e?.response?.data?.message;
    }
};

export const axiosChangeUserTransfer = async (id: number, score: number, status: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post(
            'api/transfer/update',
            {
                id,
                score,
                status,
                creatorEmail,
                creatorPassword,
            },
            getConfig()
        );

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetAllUserTransfers = async () => {
    try {
        const { data } = await axios.get('api/transfer/getAll', getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetUserTransfers = async (email: string) => {
    try {
        const { data } = await axios.post('api/transfer/getUsersTransfers', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetOneTransfer = async (id: number) => {
    try {
        const { data } = await axios.post('api/transfer/getOne', { id }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};
