import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Icon, Pressable, Row, Text, View, } from 'native-base';
import React from 'react';

export const ListItem = ({
    selected = false,
    text,
    onPress,
} : {
    selected? : boolean,
    text?     : string,
    onPress?  : () => void,
}) => (
    <Pressable
        accessibilityRole='menuitem'
        onPress={onPress}>
        <Row
            width='full'
            alignItems='center'
            space={2}>
            {selected && (
                <Icon
                    size='lg'
                    as={MaterialCommunityIcons}
                    name='check' />
            )}
            {!selected && (<View width={6} />)}
            {text && (
                <Text
                    paddingX={2}
                    paddingY={2}
                    accessibilityRole='text'
                    fontSize='lg'>
                    {text}
                </Text>
            )}
        </Row>
    </Pressable>
);
