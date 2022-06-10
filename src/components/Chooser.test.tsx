import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { Chooser, } from './Chooser';

describe('<Chooser />', () => {
    it('renders correctly', () => {
        const { getAllByRole, getByText, } = render(
            <Chooser
                isOpen
                title='dummy'
                data={[
                    'Line 1',
                    'Line 2',
                ]}
                value='Line 1' />
        );

        expect(getAllByRole('menuitem').length).toBe(2);
        expect(getByText('Line 1')).toBeDefined();
    });

    it('triggers onPress when pressed', () => {
        const handleSelect = jest.fn();

        const { getAllByRole, } = render(
            <Chooser
                isOpen
                title='dummy'
                data={[
                    'Line 1',
                    'Line 2',
                ]}
                value='Line 1'
                onSelect={handleSelect} />
        );

        fireEvent.press(getAllByRole('menuitem')[0]);

        expect(handleSelect).toHaveBeenCalledTimes(1);
        expect(handleSelect).toHaveBeenCalledWith('Line 1');
    });
});
