import { Pipe, PipeTransform } from '@angular/core';

import { LanguageEnum } from '@scaleo/platform/language/init';

@Pipe({
    name: 'authLanguageSelectFlag'
})
export class AuthLanguageFlagPipe implements PipeTransform {
    transform(value: string): string {
        const languageFlagMap: any = {
            [LanguageEnum.Catalan]: 'cat',
            [LanguageEnum.Portugal]: 'br'
        };
        return languageFlagMap[value] || value;
    }
}
