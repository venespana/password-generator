export interface Properties {
    lowercase?: boolean
    uppercase?: boolean
    numbers?: boolean
    symbols?: boolean
    excludeSimilarChars?: boolean
}

export interface Settings extends Properties {
    length: number    
}

export type GenerateFunction = (settings: Settings) => string;
export type GenerateMultipleFunction = (passwords: number, settings: Settings) => string[];