import { Button, Heading, Input, Modal, Text, } from 'native-base';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

export const EditText = ({
    title,
    value,
    variant = 'Heading',
    onChange,
    ...rest
} : {
    title?            : string,
    value?            : string,
    variant?          : 'Heading' | 'Text',
    onChange?         : (newValue? : string) => void,
    [ rest : string ] : any,
}) => {
    const { t, } = useTranslation();

    const [ isOpen,    setIsOpen,    ] = useState(false);
    const [ textValue, setTextValue, ] = useState<string | undefined>(value);

    const handlePress = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    const handleTextChange = (newValue? : string) => setTextValue(newValue);

    const handleChange = () => {
        setIsOpen(false);

        if (onChange) onChange(textValue);
    };

    return (
        <>
            {variant === 'Heading' ? (
                <Heading
                    {...rest}
                    accessibilityRole='text'
                    onPress={handlePress}>
                    {value}
                </Heading>
            ) : (
                <Text
                    {...rest}
                    accessibilityRole='text'
                    onPress={handlePress}>
                    {value}
                </Text>
            )}
            {isOpen && (
                <Modal
                    size='lg'
                    accessibilityRole='alert'
                    isOpen={isOpen}
                    onClose={handleClose}>
                    <Modal.Content>
                        <Modal.CloseButton rounded='full' />
                        {title && (<Modal.Header>{title}</Modal.Header>)}
                        <Modal.Body>
                            <Input
                                accessibilityRole='text'
                                flexGrow={1}
                                fontSize='lg'
                                value={textValue}
                                onChangeText={handleTextChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button
                                    width={16}
                                    colorScheme='muted'
                                    variant='ghost'
                                    onPress={handleClose}>
                                    {t('action_cancel')}
                                </Button>
                                <Button
                                    width={16}
                                    onPress={handleChange}>
                                    {t('action_ok')}
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            )}
        </>
    );
};
