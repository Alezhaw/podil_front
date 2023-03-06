import axios from './axios';
import { getConfig } from './axios';

export const axiosCreateUserToUserTransfer = async (score: number, userEmail: string, userNickname: string, receiverEmail: string, password: string) => {
    try {
        const time = new Date().toLocaleString().replaceAll(',', '');
        const { data } = await axios.post('api/touser/create', { score, time, userEmail, userNickname, receiverEmail, password }, getConfig());

        return data;
    } catch (e: any) {
        console.log(e);
        return e?.response?.data?.message;
    }
};

export const axiosChangeUserToUserTransfer = async (id: number, score: number, status: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post(
            'api/touser/update',
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

export const axiosGetAllUserToUserTransfers = async () => {
    try {
        const { data } = await axios.get('api/touser/getAll', getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetUserToUserTransfers = async (email: string) => {
    try {
        const { data } = await axios.post('api/touser/getUsersTransfers', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const axiosGetOneTransferToUser = async (id: number) => {
    try {
        const { data } = await axios.post('api/touser/getOne', { id }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};
