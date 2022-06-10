import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { openexchangeratesApi, } from '../apis';
import { store, } from '../redux';
import { act, fireEvent, MOCK_RATES_RESPONSE, render, waitFor, } from '../utils/test';

import { AppBar, } from './AppBar';

describe('<AppBar />', () => {
    it('renders unit types correctly', async () => {
        const { getAllByRole, getByRole, queryByRole, } = render(<AppBar />, {
            store,
        });

        await waitFor(() => {
            expect(getAllByRole('button').length).toBe(2);
            expect(queryByRole('alert')).toBeNull();
        });

        fireEvent.press(getAllByRole('button')[0]);

        await waitFor(() => {
            expect(getByRole('alert')).toBeDefined();
        });
    });

    it('renders currencies correctly', async () => {
        const { getAllByRole, getByRole, } = render(<AppBar />, {
            store,
        });

        fireEvent.press(getAllByRole('button')[1]);

        fetchMock.mockResponseOnce(JSON.stringify(MOCK_RATES_RESPONSE));

        await act(async () => {
            await store.dispatch(openexchangeratesApi.endpoints.getRates.initiate());
        });

        expect(getByRole('alert')).toBeDefined();
    });
});
