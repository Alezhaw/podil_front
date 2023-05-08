import axios from './axios';
import { getConfig } from './axios';
import { ICitiesKz } from '../interfaces/citiesKz';
import { IBaseKz } from '../interfaces/baseKz';

export const axiosCreateCitiesKz = async (cities: ICitiesKz[]) => {
    try {
        const { data } = await axios.post('api/citykz/create', { data: cities }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetAllCitiesKz = async () => {
    try {
        const { data } = await axios.get('api/citykz/get', getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCityKz = async (city: ICitiesKz) => {
    try {
        const { data } = await axios.post('api/citykz/changeOne', { ...city }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteCityKz = async (id_for_base: number) => {
    try {
        const { data } = await axios.post('api/citykz/deleteOne', { id_for_base }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteTimeKz = async (id: number) => {
    try {
        const { data } = await axios.post('api/citykz/deleteTime', { id }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosCreateBaseKz = async (bases: IBaseKz[]) => {
    try {
        const { data } = await axios.post('api/basekz/create', { data: bases }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetAllBasesKz = async () => {
    try {
        const { data } = await axios.get('api/basekz/get', getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeBaseKz = async (base: IBaseKz) => {
    try {
        const { data } = await axios.post('api/basekz/changeOne', { ...base }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteBaseKz = async (id?: number, base_id?: number) => {
    try {
        const { data } = await axios.post('api/basekz/deleteOne', { id, base_id }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};
