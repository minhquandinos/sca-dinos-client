import { RegexpEnum } from './enums/regexp.enum';
import { PatternType } from './types/pattern.type';

export const PATTERN_MAP: PatternType = Object.freeze({
    [RegexpEnum.Trim]: /^\s+|\s+$/g,
    [RegexpEnum.Email]: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
    [RegexpEnum.AllNumber]: /\d+((.|,)\d+)$/g
});
