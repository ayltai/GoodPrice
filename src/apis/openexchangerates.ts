import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';

import { Rate, } from '../models';

export const openexchangeratesApi = createApi({
    reducerPath : 'openexchangeratesApi',
    baseQuery   : fetchBaseQuery({
        baseUrl        : 'https://openexchangerates.org/api',
        prepareHeaders : headers => {
            headers.set('Authorization', `Token ${Constants.manifest?.extra?.apiKeyOpenExchangeRates as string}`);
            return headers;
        },
    }),
    endpoints   : build => ({
        getRates : build.query<Rate[], void>({
            query             : () => '/latest.json?prettyprint=0',
            transformResponse : (response : Record<string, any>) => response ? Object.keys(response.rates).map(code => ({
                code,
                rate : response.rates[code],
            })) : [],
        }),
    }),
});

export const { useGetRatesQuery, } = openexchangeratesApi;
