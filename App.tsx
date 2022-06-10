import { locale, } from 'expo-localization';
import { hideAsync, preventAutoHideAsync, } from 'expo-splash-screen';
import React, { useEffect, useState, } from 'react';

import { Main, } from './src/Main';
import { LOCALE_EN, } from './src/constants';
import { apply, en, zh, } from './src/i18n';
import { handleError, } from './src/utils';

const App = () => {
    const [ ready, setReady, ] = useState(false);

    useEffect(() => {
        preventAutoHideAsync()
            .then(() => apply({
                language         : locale?.substring(0, 2) || LOCALE_EN,
                fallbackLanguage : LOCALE_EN,
                resources        : {
                    en : {
                        translation : en,
                    },
                    zh : {
                        translation : zh,
                    },
                },
            }))
            .then(() => setReady(true))
            .catch(handleError);
    }, []);

    useEffect(() => {
        if (ready) hideAsync().catch(handleError);
    }, [ ready, ]);

    return ready ? <Main /> : null;
};

export default App;
