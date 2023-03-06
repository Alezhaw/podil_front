import axios from './axios';
import { getConfig } from './axios';

export const axiosGetChatID = async () => {
    const { data } = await axios.get('api/tg/get', getConfig());
    if (data.telegramUsers) {
        return data.telegramUsers;
    }
};

export const axiosCreateChat = async (name: string, chatid: string, email: string, password: string) => {
    const { data } = await axios.post('api/tg/create', { name, chatid, email, password }, getConfig());
    if (data) {
        return data;
    }
};

export const axiosDeleteChat = async (name: string, email: string, password: string) => {
    const { data } = await axios.post('api/tg/delete', { name, email, password }, getConfig());
    if (data) {
        return data;
    }
};
