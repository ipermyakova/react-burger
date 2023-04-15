import store from '../store';

//export type RootState = ReturnType<typeof store.getState>;
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TApplicationActions } from '../actions';
import { RootState } from '../reducers'

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn,Action, RootState, TApplicationActions>>

export type AppDispatch = typeof store.dispatch


