import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { openexchangeratesApi, } from '../apis';
import { store, } from '../redux';
import { act, MOCK_RATES_RESPONSE, render, } from '../utils/test';

import { Home, } from './Home';

describe('<Home />', () => {
    it('renders correctly', async () => {
        const { getByA11yLabel, } = render(<Home />, {
            store,
        });

        fetchMock.mockResponseOnce(JSON.stringify(MOCK_RATES_RESPONSE));

        await act(async () => {
            await store.dispatch(openexchangeratesApi.endpoints.getRates.initiate());
        });

        expect(getByA11yLabel('fab')).toBeDefined();
    });
});
