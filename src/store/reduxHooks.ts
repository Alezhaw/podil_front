import { store } from "./store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { IRootReducer } from "./rootReducers";

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootReducer> = useSelector

