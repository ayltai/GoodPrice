import React from 'react';

import { fireEvent, render, waitFor, } from '../utils/test';

import { ChooserAction, } from './ChooserAction';

describe('<ChooserAction />', () => {
    it('shows a dialog when pressed', () => {
        const { getByRole, queryByRole, } = render(
            <ChooserAction
                title='dummy'
                iconName='plus'
                data={[
                    'Line 1',
                    'Line 2',
                ]} />
        );

        expect(queryByRole('alert')).toBeNull();

        fireEvent.press(getByRole('button'));
        expect(getByRole('alert')).toBeDefined();
    });

    it('triggers onChange when an item is selected', async () => {
        const handleChange = jest.fn();

        const { getAllByRole, getByRole, } = render(
            <ChooserAction
                title='dummy'
                iconName='plus'
                data={[
                    'Line 1',
                    'Line 2',
                ]}
                onChange={handleChange} />
        );

        fireEvent.press(getByRole('button'));
        fireEvent.press(getAllByRole('menuitem')[0]);

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(handleChange).toHaveBeenCalledWith('Line 1');
        });
    });
});
