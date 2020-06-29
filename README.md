# Install

```bash
yarn add @venespana/password-generator
```
or
```bash
npm i @venespana/password-generator --save
```

# Usage

## Generate

Generate one password with the given options. Returns a string.

### Example
```ts
import { generate } '@venespana/password-generator';

const password = generate({
    length: 12,
    numbers: true,
    uppercase: true
})

```

### Props

`generate(settings)`

## GenerateMultiple

Generate one password with the given options. Returns a string.

### Example
```ts
import { generateMultiple } '@venespana/password-generator';

const password = generateMultiple(3, {
    length: 12,
    numbers: true,
    uppercase: true
})

```

### Props

`generateMultiple(amount, settings)`

## Settings

Name                |Descrption                            |Def Value|Required
--------------------|--------------------------------------|:-------:|:------:
length              |integer, length of password           |         |*
lowercase           |boolean. allow lowercase letters      |true     |
uppercase           |boolean. allow uppercase letters      |true     |
numbers             |boolean. allow numbers                |true     |
symbols             |boolean. allow special chars          |false    |
excludeSimilarChars |boolean. remove similar chars like 'i'|false    |