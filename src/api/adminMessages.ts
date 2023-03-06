import axios from './axios';
import { getConfig } from './axios';

export const axiosGetMessagestoAdmin = async (email: string) => {
    try {
        const { data } = await axios.post('api/messagesToAdmin/get', { email }, getConfig());

        return data;
    } catch (e) {
        console.log(e);
    }
};
