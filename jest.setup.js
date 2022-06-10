import '@testing-library/jest-native';
import '@testing-library/jest-native/extend-expect';

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t : key => key,
    }),
}));
