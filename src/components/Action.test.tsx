import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { Action, } from './Action';

describe('<Action />', () => {
    it('triggers onPress when pressed', () => {
        const handlePress = jest.fn();

        const { getByRole, } = render(
            <Action
                icon='plus'
                onPress={handlePress} />
        );

        fireEvent.press(getByRole('button'));

        expect(handlePress).toHaveBeenCalledTimes(1);
    });
});
