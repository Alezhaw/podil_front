import axios from './axios';
import { getConfig } from './axios';
import jwt_decode from 'jwt-decode';

export const axiosRegistration = async (email: string, password: string, nickname: string, checkRu: string | null) => {
    try {
        const { data } = await axios.post('api/user/registration', { email, password, role: 'ADMIN', nickname, checkRu });
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } catch (error: any) {
        return error?.response?.data?.message;
    }
};

export const axiosLogin = async (email: string, password: string) => {
    const { data } = await axios.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    if (!localStorage.getItem('token')) return;
    const { data } = await axios.get('api/user/auth', getConfig());
    localStorage.setItem('token', data.token);

    return jwt_decode(data.token);
};

export const axiosChangeNickname = async (nickname: 'string', id: number, password: 'string') => {
    try {
        const { data } = await axios.post('api/user/nickname', { nickname, id, password }, getConfig());

        return data;
    } catch (e: any) {
        return e?.response?.data?.message;
    }
};

export const axiosChangePassword = async (newPassword: 'string', id: number, password: 'string') => {
    try {
        const { data } = await axios.post('api/user/password', { newPassword, id, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetAllUsers = async () => {
    try {
        const { data } = await axios.get('api/user/get', getConfig());

        return data?.users;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeRole = async (role: string, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/role', { role, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
};

export const axiosChangeScore = async (score: number, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/score', { score, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosIncreaseScore = async (id: number, email: string, password: string, receiver: string) => {
    try {
        const { data } = await axios.post('api/user/increaseScore', { id, email, password, receiver }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDecreaseScore = async (score: number, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/user/decreaseScore', { score, email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeSystemMessage = async (systemMessage: string, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/message', { systemMessage, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeSystemMessageAtUser = async (email: string, password: string) => {
    try {
        const { data } = await axios.post('api/user/messageAtUser', { email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCompleted = async (completed: number, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/completed', { completed, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCheckRu = async (checkRu: string, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/checkRu', { checkRu, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCheckRuUser = async (checkRu: string, email: string, password: string) => {
    try {
        const { data } = await axios.post('api/user/checkRuUser', { checkRu, email, password }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeTransferAmount = async (minimumTransferAmount: number, sumTransferAmoumt: number, id: number, creatorEmail: string, creatorPassword: string) => {
    try {
        const { data } = await axios.post('api/user/transferAmount', { minimumTransferAmount, sumTransferAmoumt, id, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeUser = async (
    id: number,
    role: string,
    score: number,
    systemMessage: string,
    checkRu: string,
    minimumTransferAmount: number,
    completed: number,
    creatorEmail: string,
    creatorPassword: string
) => {
    try {
        const { data } = await axios.post('api/user/change', { id, role, score, systemMessage, checkRu, minimumTransferAmount, completed, creatorEmail, creatorPassword }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteUser = async (id: number, creatorEmail: string, creatorPassword: string) => {
    const { data } = await axios.post('api/user/delete', { id, creatorEmail, creatorPassword }, getConfig());

    return data;
};
