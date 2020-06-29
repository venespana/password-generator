import { GenerateFunction, Properties, GenerateMultipleFunction } from './type';

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = lowercase.toUpperCase();
const number = '1234567890';
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
const symylarChars = /[ilLI|`oO0]/g;

const randomChar: (chars: string) => string = (chars) => {
    const index = Math.floor(Math.random() * (chars.length - 1))
    return chars[index];
}

export const generate: GenerateFunction = (settings) => {
    const { length, ...options } = settings;
    const properties: Properties = {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false,
        excludeSimilarChars: false,
        ...options
    };

    const password: string[] = [];
    let chars = '';

    if (properties.lowercase) {
        chars += lowercase;
    }

    if (properties.uppercase) {
        chars += uppercase;
    }

    if (properties.numbers) {
        chars += number;
    }

    if (properties.symbols) {
        chars += symbols;
    }

    if (properties.excludeSimilarChars) {
        chars = chars.replace(symylarChars, '');
    }

    for (let i = 0; i < length; i++) {
        const char = randomChar(chars);
        password.push(char);
    }

    return password.join('');
}

export const generateMultiple: GenerateMultipleFunction = (passwords, settings) => {
    const result: string[] = [];
    const length = passwords;

    for (let i = 0; i < length; i++) {
        result.push(generate(settings));
    }

    return result;
} ;