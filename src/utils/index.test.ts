import { generateRandomName, } from './index';

describe('<index />', () => {
    it('generate a first name and a last name', () => {
        expect(generateRandomName().split(' ').length).toBe(2);
    });
});
