import i18next, { Resource, } from 'i18next';
import { initReactI18next, } from 'react-i18next';

import { handleError, } from '../utils';

import en from './en.json';
import zh from './zh.json';

export const apply = ({
    language,
    fallbackLanguage,
    resources,
} : {
    language         : string,
    fallbackLanguage : string,
    resources        : Resource,
}) => i18next.use(initReactI18next)
    .init({
        lng               : language,
        fallbackLng       : fallbackLanguage,
        nsSeparator       : false,
        keySeparator      : false,
        compatibilityJSON : 'v3',
        interpolation     : {
            escapeValue : false,
        },
        resources,
    })
    .catch(handleError);

export { en, zh, };
