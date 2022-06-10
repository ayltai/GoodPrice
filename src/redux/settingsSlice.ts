import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { currency, } from 'expo-localization';

import { CURRENCY_USD, } from '../constants';
import { Currency, UnitType, } from '../models';

type SettingsState = {
    currency : Currency,
    unitType : UnitType,
};

const initialState : SettingsState = {
    currency : {
        code : currency || CURRENCY_USD.code,
    },
    unitType : 'weight',
};

const settingsSlice = createSlice({
    initialState,
    name     : 'settings',
    reducers : {
        setCurrency : (state, action : PayloadAction<Currency>) => {
            state.currency = action.payload;
        },
        setUnitType : (state, action : PayloadAction<UnitType>) => {
            state.unitType = action.payload;
        },
    },
});

export const { setCurrency, setUnitType, } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
