import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Actionsheet, FlatList, Heading, Icon, View, } from 'native-base';
import React, { useState, } from 'react';

import { Action, } from './Action';

export const ChooserAction = ({
    title,
    iconName,
    data,
    value,
    onChange,
} : {
    title?    : string,
    iconName  : string,
    data?     : string[],
    value?    : string,
    onChange? : (newValue : string) => void,
}) => {
    const [ isOpen, setIsOpen, ] = useState(false);

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    const handleChange = (newValue : string) => {
        setIsOpen(false);

        if (onChange) onChange(newValue);
    };

    const renderItem = ({
        item,
    } : {
        item : string,
    }) => {
        const handlePress = () => handleChange(item);

        return (
            <Actionsheet.Item
                key={item}
                accessibilityRole='menuitem'
                flexGrow={1}
                startIcon={value === item ? (
                    <Icon
                        size='lg'
                        as={MaterialCommunityIcons}
                        name='check' />
                ) : <View width={6} />}
                onPress={handlePress}>
                {item}
            </Actionsheet.Item>
        );
    };

    return (
        <>
            <Action
                icon={iconName}
                tooltip={title}
                onPress={handleOpen} />
            {isOpen && (<Actionsheet
                accessibilityRole='alert'
                isOpen={isOpen}
                onClose={handleClose}>
                <Actionsheet.Content>
                    {title && <Heading>{title}</Heading>}
                    <FlatList
                        width='full'
                        data={data}
                        renderItem={renderItem} />
                </Actionsheet.Content>
            </Actionsheet>)}
        </>
    );
};
