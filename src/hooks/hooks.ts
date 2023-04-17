import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { RootState } from '../services/reducers'
import { AppDispatch, AppThunk } from "../services/types";
import type {} from 'redux-thunk/extend-redux'

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
