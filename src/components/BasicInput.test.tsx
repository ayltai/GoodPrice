import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { BasicInput, } from './BasicInput';

describe('<BasicInput />', () => {
    it('triggers onValueChange when value changes', () => {
        const handleChange = jest.fn();

        const { getByRole, } = render(
            <BasicInput
                title='dummy'
                onChange={handleChange} />
        );

        fireEvent.changeText(getByRole('text'), '1');
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(1);
    });
});
