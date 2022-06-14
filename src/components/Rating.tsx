import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Icon, Row, } from 'native-base';
import React from 'react';

const MAX_STARS = 10;

export const Rating = ({
    value,
    ...rest
} : {
    value? : number,
    [ rest : string ] : any,
}) => {
    const fullStars  = [];
    const emptyStars = [];

    let safeValue = 0;

    if (value === undefined) {
        for (let i = 0; i < MAX_STARS / 2; i++) emptyStars.push(i);
    } else {
        safeValue  = Math.min(MAX_STARS, Math.max(0, value));

        for (let i = 0; i < Math.floor((MAX_STARS - safeValue) / 2); i++) fullStars.push(i);
        for (let i = 0; i < Math.floor(safeValue / 2); i++) emptyStars.push(i);
    }

    return (
        <Row
            accessibilityRole='progressbar'
            {...rest}>
            {fullStars.map(star => (
                <Icon
                    key={`full-${star}`}
                    size={8}
                    color={value === undefined ? 'muted.500' : 'primary.500'}
                    as={MaterialCommunityIcons}
                    name='star' />
            ))}
            {safeValue % 2 === 1 && (
                <Icon
                    size={8}
                    color={value === undefined ? 'muted.500' : 'primary.500'}
                    as={MaterialCommunityIcons}
                    name='star-half-full' />
            )}
            {emptyStars.map(star => (
                <Icon
                    key={`empty-${star}`}
                    size={8}
                    color={value === undefined ? 'muted.500' : 'primary.500'}
                    as={MaterialCommunityIcons}
                    name='star-outline' />
            ))}
        </Row>
    );
};
