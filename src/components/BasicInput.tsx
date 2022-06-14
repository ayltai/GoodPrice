import { FormControl, Input, InputGroup, } from 'native-base';
import React, { useState, } from 'react';

import { toNumber, } from '../utils';

export const BasicInput = ({
    title,
    error,
    value,
    onChange,
    ...rest
}: {
    title            : string,
    error?           : string,
    value?           : string,
    onChange?        : (newValue? : number) => void,
    [ rest: string ] : any,
}) => {
    const [ isInvalid, setIsInvalid, ] = useState(false);

    const handleChange = (newValue? : string) => {
        setIsInvalid(newValue === undefined || newValue === null || newValue === '');

        if (onChange) onChange(toNumber(newValue));
    };

    return (
        <FormControl
            {...rest}
            isInvalid={isInvalid}>
            <FormControl.Label>{title}</FormControl.Label>
            <InputGroup>
                <Input
                    accessibilityRole='text'
                    flexGrow={1}
                    fontSize='lg'
                    keyboardType='numeric'
                    value={value ? String(value) : ''}
                    onChangeText={handleChange} />
            </InputGroup>
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
        </FormControl>
    );
};
