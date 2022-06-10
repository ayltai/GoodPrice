import { Button, FormControl, Input, InputGroup, InputRightAddon, Text, Tooltip, } from 'native-base';
import React, { useState, } from 'react';

import { toNumber, } from '../utils';

import { Chooser, } from './Chooser';

export const CompoundInput = ({
    title,
    error,
    value,
    chooserTitle,
    chooserData,
    chooserValue,
    onValueChange,
    onChooserSelected,
    ...rest
} : {
    title              : string,
    error?             : string,
    value?             : number,
    chooserTitle       : string,
    chooserData        : string[],
    chooserValue?      : string,
    onValueChange?     : (newValue? : number) => void,
    onChooserSelected? : (newUnit? : string) => void,
    [ rest : string ]  : any,
}) => {
    const [ isOpen,    setIsOpen,    ] = useState(false);
    const [ isInvalid, setIsInvalid, ] = useState(false);

    const handleValueChange = (newValue? : string) => {
        if (newValue === undefined || newValue === null || newValue === '') setIsInvalid(true);

        if (onValueChange) onValueChange(toNumber(newValue));
    };

    const handleChooserPress = () => setIsOpen(true);

    const handleChooserSelect = (newValue? : string) => {
        setIsOpen(false);

        if (onChooserSelected) onChooserSelected(newValue);
    };

    const handleChooserClose = () => setIsOpen(false);

    return (
        <>
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
                        onChangeText={handleValueChange} />
                    <InputRightAddon padding={0}>
                        <Tooltip label={title}>
                            <Button
                                size='sm'
                                variant='ghost'
                                onPress={handleChooserPress}>
                                <Text color='muted.500'>{chooserValue}</Text>
                            </Button>
                        </Tooltip>
                    </InputRightAddon>
                </InputGroup>
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
            </FormControl>
            {isOpen && (
                <Chooser
                    isOpen={isOpen}
                    title={chooserTitle}
                    data={chooserData}
                    value={chooserValue}
                    onSelect={handleChooserSelect}
                    onClose={handleChooserClose} />
            )}
        </>
    );
};
