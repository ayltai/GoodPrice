import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { CompoundInput, } from './CompoundInput';

describe('<CompoundInput />', () => {
    it('shows a Chooser when pressed', () => {
        const handleSelect = jest.fn();

        const { getAllByRole, getByRole, } = render(
            <CompoundInput
                title='dummy'
                chooserTitle='dummy'
                chooserData={[
                    'Line 1',
                    'Line 2',
                ]}
                onChooserSelected={handleSelect} />
        );

        fireEvent.press(getByRole('button'));
        expect(getByRole('alert')).toBeDefined();

        fireEvent.press(getAllByRole('menuitem')[0]);
        expect(handleSelect).toHaveBeenCalledTimes(1);
        expect(handleSelect).toHaveBeenCalledWith('Line 1');
    });

    it('triggers onValueChange when value changes', () => {
        const handleValueChange = jest.fn();

        const { getByRole,} = render(
            <CompoundInput
                title='dummy'
                chooserTitle='dummy'
                chooserData={[
                    '1',
                    '2',
                ]}
                onValueChange={handleValueChange} />
        );

        fireEvent.changeText(getByRole('text'), '3');
        expect(handleValueChange).toHaveBeenCalledTimes(1);
        expect(handleValueChange).toHaveBeenCalledWith(3);
    });
});
