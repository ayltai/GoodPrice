import { DefaultTheme, DarkTheme, NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { NativeBaseProvider, } from 'native-base';
import React, { useEffect, useState, } from 'react';
import { useColorScheme, } from 'react-native';
import { useTranslation, } from 'react-i18next';
import { Provider, } from 'react-redux';

import { store, } from './redux';
import { Home, } from './screens';
import { AppTheme, } from './styles';

const Stack = createNativeStackNavigator();

const Root = () => {
    const colorMode = useColorScheme() || 'light';

    const [ theme, setTheme, ] = useState(AppTheme(colorMode));

    const { t, } = useTranslation();

    const screenOptions : () => Record<string, any> = () => ({
        headerShadowVisible : true,
    });

    useEffect(() => setTheme(AppTheme(colorMode)), [ colorMode, ]);

    return (
        <NativeBaseProvider
            config={{
                strictMode : 'error',
            }}
            theme={theme}>
            <NavigationContainer theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
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
