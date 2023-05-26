import axios from './axios';
import { getConfig } from './axios';
import { ICitiesRu } from '../interfaces/citiesRu';
import { IBaseRu } from '../interfaces/baseRu';

export const axiosCreateCitiesRu = async (cities: ICitiesRu[]) => {
    try {
        const { data } = await axios.post('api/city/create', { data: cities }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetAllCitiesRu = async () => {
    try {
        const { data } = await axios.get('api/city/get', getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCityRu = async (city: ICitiesRu) => {
    try {
        const { data } = await axios.post('api/city/changeOne', { ...city }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeCheckRu = async (id_for_base?: number, id?: number, check_base?: boolean, check_speaker?: boolean, check_scenario?: boolean) => {
    try {
        const { data } = await axios.post('api/city/changeCheck', { id_for_base, id, check_base, check_speaker, check_scenario }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteCityRu = async (id_for_base: number) => {
    try {
        const { data } = await axios.post('api/city/deleteOne', { id_for_base }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteTimeRu = async (id: number) => {
    try {
        const { data } = await axios.post('api/city/deleteTime', { id }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosCreateBaseRu = async (bases: IBaseRu[]) => {
    try {
        const { data } = await axios.post('api/base/create', { data: bases }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosGetAllBasesRu = async () => {
    try {
        const { data } = await axios.get('api/base/get', getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosChangeBaseRu = async (base: IBaseRu) => {
    try {
        const { data } = await axios.post('api/base/changeOne', { ...base }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const axiosDeleteBaseRu = async (id?: number, base_id?: number) => {
    try {
        const { data } = await axios.post('api/base/deleteOne', { id, base_id }, getConfig());

        return data;
    } catch (e) {
        console.error(e);
    }
};
