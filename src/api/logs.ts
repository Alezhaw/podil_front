import axios from './axios';
import { getConfig } from './axios';
let controllerGetAllLogsCity: AbortController | null = null;
let controllerGetAllLogsBase: AbortController | null = null;

export const axiosGetAllLogsCity = async () => {
    try {
        if(controllerGetAllLogsCity !== null) {
            controllerGetAllLogsCity.abort()
        }
        controllerGetAllLogsCity = new AbortController();
        const { data } = await axios.get('api/log/getCities', {...getConfig(), signal: controllerGetAllLogsCity.signal});
        return data;
    } catch (e) {
        if (axios.isCancel(e))  {
            console.log('Request canceled', e.message);
        }else {
        console.error(e);
        }
    }
};

export const axiosGetAllLogsBase = async () => {
    try {
        if(controllerGetAllLogsBase !== null) {
            controllerGetAllLogsBase.abort()
        }
        controllerGetAllLogsBase = new AbortController();
        const { data } = await axios.get('api/log/getBases', {...getConfig(), signal: controllerGetAllLogsBase.signal});
        return data;
    } catch (e) {
        if (axios.isCancel(e))  {
            console.log('Request canceled', e.message);
        }else {
        console.error(e);
        }
    }
};