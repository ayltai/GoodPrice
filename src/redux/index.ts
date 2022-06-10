import { configureStore, } from '@reduxjs/toolkit';

import { openexchangeratesApi, } from '../apis';

import { settingsReducer, } from './settingsSlice';

export const store = configureStore({
    reducer : {
        [ openexchangeratesApi.reducerPath ] : openexchangeratesApi.reducer,
        settings                             : settingsReducer,
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(openexchangeratesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { settingsReducer, setCurrency, setUnitType, } from './settingsSlice';
