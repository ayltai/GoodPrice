export default ({ config, }) => ({
    ...config,
    name                : 'GoodPrice',
    slug                : 'GoodPrice',
    version             : '1.0.0',
    orientation         : 'portrait',
    icon                : './assets/icon.png',
    userInterfaceStyle  : 'automatic',
    splash              : {
        image           : './assets/splash.png',
        resizeMode      : 'contain',
        backgroundColor : '#ffffff',
    },
    updates             : {
        fallbackToCacheTimeout : 0,
    },
    assetBundlePatterns : [
        '**/*',
    ],
    android             : {
        package : 'com.github.ayltai.goodprice',
    },
    ios                 : {
        supportsTablet : true,
    },
    web                 : {
        favicon : './assets/favicon.png',
    },
    extra               : {
        apiKeyOpenExchangeRates : process.env.API_KEY_OPEN_EXCHANGE_RATES,
    },
});
