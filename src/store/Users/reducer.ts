import { IAction } from '../utils';
import { reducerTypes } from './types';
import { IUser } from '../../interfaces/users';
import { ICities } from '../../interfaces/cities';
import { IBase } from '../../interfaces/base';
import { ILogsCity } from '../../interfaces/logsCity';
import { ILogsBase } from '../../interfaces/logsBase';

export interface IUsersReducer {
    user: IUser | {};
    allUsers: any | [];
    citiesRu: ICities[] | [];
    storedCities: ICities[] | [];
    citiesKz: ICities[] | [];
    basesRu: IBase[] | [];
    bases: IBase[] | [];
    basesKz: IBase[] | [];
    logsCity: ILogsCity[] | [];
    logsBase: ILogsBase[] | [];
}

export const INITIAL: IUsersReducer = {
    user: {},
    allUsers: [],
    citiesRu: [],
    storedCities: [],
    citiesKz: [],
    basesRu: [],
    bases: [],
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
        case reducerTypes.GET_CITIES:
            return { ...state, storedCities: payload };
        case reducerTypes.GET_BASES_RU:
            return { ...state, basesRu: payload };
        case reducerTypes.GET_BASES:
            return { ...state, bases: payload };
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
