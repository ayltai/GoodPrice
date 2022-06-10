import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { EditText, } from './EditText';

describe('<EditText />', () => {
    it('shows a dialog when pressed', () => {
        const { getByRole, queryByRole, } = render(<EditText />);

        expect(getByRole('text')).toBeDefined();
        expect(queryByRole('alert')).toBeNull();

        fireEvent.press(getByRole('text'));
        expect(getByRole('alert')).toBeDefined();
    });

    it('triggers onChange when text is changed', () => {
        const handleChange = jest.fn();

        const { getAllByRole, getByRole, } = render(<EditText onChange={handleChange} />);

        fireEvent.press(getByRole('text'));
        fireEvent.changeText(getAllByRole('text')[1], 'dummy');
        fireEvent.press(getAllByRole('button')[2]);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('dummy');
    });
});
