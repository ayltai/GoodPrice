import { FlatList, Modal, } from 'native-base';
import React from 'react';

import { ListItem, } from './ListItem';

export const Chooser = ({
    isOpen = false,
    title,
    data,
    value,
    onClose,
    onSelect,
} : {
    isOpen?   : boolean,
    title?    : string,
    data?     : string[],
    value?    : string,
    onClose?  : () => void,
    onSelect? : (selectedValue : string) => void,
}) => {
    const renderItem = ({
        item,
    } : {
        item : string,
    }) => {
        const handlePress = () => onSelect && onSelect(item);

        return (
            <ListItem
                selected={item === value}
                text={item}
                onPress={handlePress} />
        );
    };

    return (
        <Modal
            size='lg'
            accessibilityRole='alert'
            isOpen={isOpen}
            onClose={onClose}>
            <Modal.Content>
                <Modal.CloseButton rounded='full' />
                {title && <Modal.Header>{title}</Modal.Header>}
                <Modal.Body>
                    <FlatList
                        data={data}
                        renderItem={renderItem} />
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
};
