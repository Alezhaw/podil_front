import { combineReducers } from "redux";
import { UserReducer } from "./Users/reducer";
import { IUsersReducer } from "./Users/reducer";
import { ITrailsReducer } from "./Users/trails/trailsReducer";
import { TrailsReducer } from "./Users/trails/trailsReducer";

export interface IRootReducer {
  user: IUsersReducer;
  trails: ITrailsReducer;
}

export const rootReducer = combineReducers<IRootReducer>({
  user: UserReducer,
  trails: TrailsReducer,
});
