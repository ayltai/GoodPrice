import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Icon, IconButton, Tooltip, useColorMode, } from 'native-base';
import React from 'react';

export const Action = ({
    icon,
    tooltip,
    onPress,
} : {
    icon     : string,
    tooltip? : string,
    onPress  : () => void,
}) => {
    const { colorMode, } = useColorMode();

    return (
        <Tooltip label={tooltip || ''}>
            <IconButton
                borderRadius='full'
                icon={
                    <Icon
                        as={MaterialCommunityIcons}
                        color={colorMode === 'light' ? 'darkText' : 'lightText'}
                        name={icon} />
                }
                onPress={onPress} />
        </Tooltip>
    );
};
