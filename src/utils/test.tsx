import { NavigationContainer, } from '@react-navigation/native';
import { configureStore, PreloadedState, Store, } from '@reduxjs/toolkit';
import { render, } from '@testing-library/react-native';
import { NativeBaseProvider, } from 'native-base';
import React, { ReactNode, } from 'react';
import { Provider, } from 'react-redux';

import { settingsReducer, } from '../redux';
import { AppTheme, } from '../styles';

export const MOCK_RATES_RESPONSE = {
    'disclaimer' : 'Usage subject to terms: https://openexchangerates.org/terms',
    'license'    : 'https://openexchangerates.org/license',
    'timestamp'  : 1655197200,
    'base'       : 'USD',
    'rates'      : {
        'AED' : 3.6731,
        'AFN' : 89.155841,
        'ALL' : 115.273159,
        'AMD' : 424.567988,
        'ANG' : 1.81027,
        'AOA' : 434.6878,
        'ARS' : 122.304694,
        'AUD' : 1.442422,
        'AWG' : 1.8,
        'AZN' : 1.7,
        'BAM' : 1.876564,
        'BBD' : 2,
        'BDT' : 94.317169,
        'BGN' : 1.870309,
        'BHD' : 0.376924,
        'BIF' : 2065.716482,
        'BMD' : 1,
        'BND' : 1.396634,
        'BOB' : 6.905475,
        'BRL' : 5.1154,
        'BSD' : 1,
        'BTC' : 0.000044167748,
        'BTN' : 78.432645,
        'BWP' : 12.324749,
        'BYN' : 3.39068,
        'BZD' : 2.024707,
        'CAD' : 1.29102,
        'CDF' : 2009.064886,
        'CHF' : 0.988946,
        'CLF' : 0.031275,
        'CLP' : 862.96,
        'CNH' : 6.751959,
        'CNY' : 6.7365,
        'COP' : 3945.351813,
        'CRC' : 687.973303,
        'CUC' : 1,
        'CUP' : 25.75,
        'CVE' : 105.27,
        'CZK' : 23.641633,
        'DJF' : 178.82015,
        'DKK' : 7.110049,
        'DOP' : 55.496921,
        'DZD' : 146.192633,
        'EGP' : 18.7698,
        'ERN' : 15.000001,
        'ETB' : 52.263052,
        'EUR' : 0.9555,
        'FJD' : 2.19255,
        'FKP' : 0.822867,
        'GBP' : 0.822867,
        'GEL' : 2.94,
        'GGP' : 0.822867,
        'GHS' : 7.985244,
        'GIP' : 0.822867,
        'GMD' : 54.15,
        'GNF' : 8892.960958,
        'GTQ' : 7.764186,
        'GYD' : 210.139487,
        'HKD' : 7.84997,
        'HNL' : 24.680011,
        'HRK' : 7.1875,
        'HTG' : 115.011216,
        'HUF' : 380.806072,
        'IDR' : 14714.35,
        'ILS' : 3.445439,
        'IMP' : 0.822867,
        'INR' : 78.037754,
        'IQD' : 1466.044452,
        'IRR' : 42250,
        'ISK' : 132.33,
        'JEP' : 0.822867,
        'JMD' : 153.914691,
        'JOD' : 0.709,
        'JPY' : 134.182,
        'KES' : 117.2,
        'KGS' : 79.5048,
        'KHR' : 4080.139647,
        'KMF' : 471.620221,
        'KPW' : 900,
        'KRW' : 1286.214994,
        'KWD' : 0.306935,
        'KYD' : 0.837071,
        'KZT' : 439.41482,
        'LAK' : 14732.581466,
        'LBP' : 1518.984262,
        'LKR' : 360.104799,
        'LRD' : 151.999978,
        'LSL' : 16.139531,
        'LYD' : 4.800522,
        'MAD' : 10.032333,
        'MDL' : 19.131518,
        'MGA' : 4072.124913,
        'MKD' : 58.726373,
        'MMK' : 1859.769958,
        'MNT' : 3117.1852,
        'MOP' : 8.12151,
        'MRU' : 36.712978,
        'MUR' : 44.249997,
        'MVR' : 15.36,
        'MWK' : 1026.164603,
        'MXN' : 20.526617,
        'MYR' : 4.4225,
        'MZN' : 63.900001,
        'NAD' : 16.09,
        'NGN' : 415.5,
        'NIO' : 36.009325,
        'NOK' : 9.898591,
        'NPR' : 125.497479,
        'NZD' : 1.597064,
        'OMR' : 0.385027,
        'PAB' : 1,
        'PEN' : 3.785194,
        'PGK' : 3.540039,
        'PHP' : 53.238499,
        'PKR' : 205.312984,
        'PLN' : 4.447548,
        'PYG' : 6885.505434,
        'QAR' : 3.64625,
        'RON' : 4.723495,
        'RSD' : 112.138193,
        'RUB' : 57.500001,
        'RWF' : 1025.868499,
        'SAR' : 3.751861,
        'SBD' : 8.10712,
        'SCR' : 13.158674,
        'SDG' : 456.5,
        'SEK' : 10.1432,
        'SGD' : 1.3897,
        'SHP' : 0.822867,
        'SLL' : 13130,
        'SOS' : 581.067785,
        'SRD' : 21.8315,
        'SSP' : 130.26,
        'STD' : 23263,
        'STN' : 23.7,
        'SVC' : 8.789058,
        'SYP' : 2512.53,
        'SZL' : 16.137284,
        'THB' : 34.9515,
        'TJS' : 10.973366,
        'TMT' : 3.51,
        'TND' : 3.0855,
        'TOP' : 2.344563,
        'TRY' : 17.254649,
        'TTD' : 6.827415,
        'TWD' : 29.677999,
        'TZS' : 2330,
        'UAH' : 29.675694,
        'UGX' : 3751.567523,
        'USD' : 1,
        'UYU' : 39.594636,
        'UZS' : 11054.062116,
        'VES' : 5.30395,
        'VND' : 23220,
        'VUV' : 115.454666,
        'WST' : 2.639454,
        'XAF' : 626.766791,
        'XAG' : 0.04709318,
        'XAU' : 0.00054768,
        'XCD' : 2.70255,
        'XDR' : 0.731063,
        'XOF' : 626.766791,
        'XPD' : 0.00055068,
        'XPF' : 114.021457,
        'XPT' : 0.00106839,
        'YER' : 250.299955,
        'ZAR' : 16.103984,
        'ZMW' : 16.950275,
        'ZWL' : 322,
    },
};

const createStore = (preloadedState? : {
    [ key : string ] : any,
}) => configureStore({
    reducer : {
        settings : settingsReducer,
    },
    preloadedState,
});

const defaultStore = createStore();

type RootState = ReturnType<typeof defaultStore.getState>;

export const defaultState : RootState = {
    settings : {
        currency : {
            code : 'USD',
        },
        unitType : 'weight',
    },
};

const customRender = (ui : any, {
    preloadedState,
    store = createStore(preloadedState),
    ...rest
} : {
    preloadedState?   : PreloadedState<RootState>,
    store?            : Store<RootState>,
    [ rest : string ] : any,
} = {}) => render(ui, {
    wrapper : ({
        children,
    } : {
        children : ReactNode,
    }) => {
        const theme = AppTheme('light');

        return (
            <Provider store={store}>
                <NativeBaseProvider
                    config={{
                        strictMode : 'error',
                    }}
                    initialWindowMetrics={{
                        frame  : {
                            x      : 0,
                            y      : 0,
                            width  : 0,
                            height : 0,
                        },
                        insets : {
                            left   : 0,
                            right  : 0,
                            top    : 0,
                            bottom : 0,
                        },
                    }}
                    theme={theme}>
                    <NavigationContainer>
                        {children}
                    </NavigationContainer>
                </NativeBaseProvider>
            </Provider>
        );
    },
    ...rest,
});

export * from '@testing-library/react-native';

export { customRender as render, };
