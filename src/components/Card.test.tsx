import React from 'react';

import { Units, } from '../models';
import { render, } from '../utils/test';

import { Card, } from './Card';

describe('<Card />', () => {
    it('renders correctly', () => {
        const { getAllByRole, getByRole, } = render(
            <Card
                currency={{
                    code : 'USD',
                }}
                currencies={[
                    {
                        code : 'GPB',
                    },
                    {
                        code : 'USD',
                    },
                ]}
                units={Units} />
        );

        expect(getAllByRole('text').length).toBe(4);
        expect(getByRole('progressbar')).toBeDefined();
    });
});
