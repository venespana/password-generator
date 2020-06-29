import { generateMultiple } from './index';
import { generate } from "."

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeLowerCase(): R
            toBeUpperCase(): R,
            toBeNumber(): R,
            toBeOnlySymbols(): R,
            toBeExcludeSimilars(): R
        }
    }
}

expect.extend({
    toBeLowerCase(received) {
        const lower = received.toLowerCase();
        
        const result = {
            message: () => `expected ${received} to be a lowercase chain`,
            pass: lower === received
        }

        if (lower === received) {
            result.message = () => `${received} is a lowercase chain`;
        }
        return result;
    },
    toBeUpperCase(received) {
        const upper = received.toUpperCase();
        
        const result = {
            message: () => `expected ${received} to be a uppercase chain`,
            pass: upper === received
        }

        if (upper === received) {
            result.message = () => `${received} is a uppercase chain`;
        }
        return result;
    },
    toBeNumber(received) {
        const pass = !isNaN(received);
        
        const result = {
            message: () => `expected ${received} to be a numeric chain`,
            pass: pass
        }

        if (pass) {
            result.message = () => `${received} is a numeric chain`;
        }
        return result;
    },
    toBeOnlySymbols(received) {
        const pass = `${received}`.replace(/[a-zA-Z0-9]*/, '') === `${received}`;

         const result = {
            message: () => `expected ${received} not to contain any letters or numbers`,
            pass: pass
        }

        if (pass) {
            result.message = () => `${received} not contain any letters or numbers`;
        }
        return result;
    },
    toBeExcludeSimilars(received) {
        const pass = `${received}`.replace(/[ilLI|`oO0]/g, '') === `${received}`;

         const result = {
            message: () => `expected ${received} not to contain any similar chars`,
            pass: pass
        }

        if (pass) {
            result.message = () => `${received} not contain any similar chars`;
        }
        return result;
    }
})

const settings = {
    length: 12,
    lowercase: true,
    uppercase: false,
    symbols: false,
    numbers: false
};

describe('generator', () => {
    test('Should be a lowercase password only', () => {
        expect(generate(settings)).toBeLowerCase();
        expect(generate(settings)).not.toBeUpperCase();
        expect(generate(settings)).not.toBeNumber();
        expect(generate).not.toBeOnlySymbols();
    });

    test('Should be a uppercase password only', () => {
        expect(generate({ ...settings, uppercase: true, lowercase: false })).toBeUpperCase();
        expect(generate({ ...settings, uppercase: true, lowercase: false })).not.toBeLowerCase();
        expect(generate({ ...settings, uppercase: true, lowercase: false })).not.toBeNumber();
        expect(generate({ ...settings, uppercase: true, lowercase: false })).not.toBeOnlySymbols();
    })

    test('Should be a number password only', () => {
        expect(generate({ ...settings, uppercase: false, lowercase: false, numbers: true })).toBeNumber();
        expect(generate({ ...settings, uppercase: false, lowercase: false, numbers: true })).not.toBeOnlySymbols();
    })

    test('Should be a only symbols password only', () => {
        expect(generate({ ...settings, lowercase: false, symbols: true })).toBeOnlySymbols();
        expect(generate({ ...settings, lowercase: false, symbols: true })).not.toBeNumber();
    })

    test('Should be a exclude similar characters', () => {
        expect(generate({ ...settings, excludeSimilarChars: true })).toBeExcludeSimilars();
        expect(generate({ ...settings, uppercase: true, excludeSimilarChars: true })).toBeExcludeSimilars();
        expect(generate({ ...settings, uppercase: true, symbols: true, excludeSimilarChars: true })).toBeExcludeSimilars();
        expect(generate({ ...settings, uppercase: true, symbols: true, numbers: true, excludeSimilarChars: true })).toBeExcludeSimilars();
    })
})
