import React from 'react';

import { render, } from '../utils/test';

import { ListItem, } from './ListItem';

describe('<ListItem />', () => {
    it('renders text correctly', () => {
        const { getByRole, } = render(<ListItem text='dummy' />);

        expect(getByRole('text')).toBeDefined();
    });
});
