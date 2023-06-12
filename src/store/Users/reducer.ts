import { IAction } from '../utils';
import { reducerTypes } from './types';
import { IUser } from '../../interfaces/users';
import { ICitiesRu } from '../../interfaces/citiesRu';
import { ICitiesKz } from '../../interfaces/citiesKz';
import { IBaseRu } from '../../interfaces/baseRu';
import { IBaseKz } from '../../interfaces/baseKz';
import { ILogsCity } from '../../interfaces/logsCity';
import { ILogsBase } from '../../interfaces/logsBase';

export interface IUsersReducer {
    user: IUser | {};
    allUsers: any | [];
    citiesRu: ICitiesRu[] | [];
    citiesKz: ICitiesKz[] | [];
    basesRu: IBaseRu[] | [];
    basesKz: IBaseKz[] | [];
    logsCity: ILogsCity[] | [];
    logsBase: ILogsBase[] | [];
}

export const INITIAL: IUsersReducer = {
    user: {},
    allUsers: [],
    citiesRu: [],
    citiesKz: [],
    basesRu: [],
    basesKz: [],
    logsCity: [],
    logsBase: [],
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
    switch (type) {
        case reducerTypes.GET_USER:
            return { ...state, user: payload };
        case reducerTypes.GET_ALL_USERS:
            return { ...state, allUsers: payload };
        case reducerTypes.GET_CITIES_RU:
            return { ...state, citiesRu: payload };
        case reducerTypes.GET_CITIES_KZ:
            return { ...state, citiesKz: payload };
        case reducerTypes.GET_BASES_RU:
            return { ...state, basesRu: payload };
        case reducerTypes.GET_BASES_KZ:
            return { ...state, basesKz: payload };
        case reducerTypes.GET_LOGS_CITIES:
            return { ...state, logsCity: payload };
        case reducerTypes.GET_LOGS_BASES:
            return { ...state, logsBase: payload };
        default:
            return state;
    }
};
