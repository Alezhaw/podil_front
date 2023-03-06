import { combineReducers } from "redux";
import { UserReducer } from "./Users/reducer";
import { IUsersReducer } from "./Users/reducer";

export interface IRootReducer {
    user: IUsersReducer;

}

export const rootReducer = combineReducers<IRootReducer>({
    user: UserReducer,
});
