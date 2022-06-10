import { extendTheme, } from 'native-base';

export const AppTheme = (colorMode? : 'light' | 'dark' | null) => extendTheme({
    config : {
        initialColorMode : colorMode,
    },
});
