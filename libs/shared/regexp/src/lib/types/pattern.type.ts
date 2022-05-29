import { RegexpEnum } from '../enums/regexp.enum';

export type RegexpNameType = keyof Record<RegexpEnum, string>;

export type PatternType = {
    [pattern in RegexpNameType]: RegExp;
};
