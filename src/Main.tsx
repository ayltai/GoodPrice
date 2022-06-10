import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { NativeBaseProvider, useColorMode, } from 'native-base';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { Provider, } from 'react-redux';

import { store, } from './redux';
import { Home, } from './screens';
import { AppTheme, } from './styles';

const Stack = createNativeStackNavigator();

const Root = () => {
    const { colorMode, } = useColorMode();
    const theme = AppTheme(colorMode);

    const { t, } = useTranslation();

    const screenOptions : () => Record<string, any> = () => ({
        headerShadowVisible : true,
    });

    return (
        <NativeBaseProvider
            config={{
                strictMode : 'error',
            }}
            theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Home'
                    screenOptions={screenOptions}>
                    <Stack.Screen
                        name='Home'
                        component={Home}
                        options={{
                            title     : t('app_name'),
                            animation : 'default',
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export const Main = () => (
    <Provider store={store}>
        <Root />
    </Provider>
);
