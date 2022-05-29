import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO refactor this pipe
@Pipe({
    name: 'customTranslate'
})
export class CustomTranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    public static convertTitle(title: string, lowerCaseTransform: boolean = true): string {
        const newTitle = lowerCaseTransform ? title.toLowerCase() : title;

        return newTitle
            .trim()
            .replace(/[().,]/g, '')
            .replace(/[ ]/g, '_');
    }

    transform(value: unknown, key?: string, lowerCaseTransform?: boolean): Observable<any> {
        let translated: string | string[];
        if (Array.isArray(value) && value.length === 0) {
            return of(value);
        }
        if (value && key) {
            if (Array.isArray(value)) {
                translated = value.map((obj) => {
                    const title = CustomTranslatePipe.convertTitle(obj.title, lowerCaseTransform);
                    return `${key}.${title}`;
                });
            } else if (typeof value === 'string') {
                const title = CustomTranslatePipe.convertTitle(value, lowerCaseTransform);
                translated = `${key}.${title}`;
            } else {
                return of(value);
            }

            return this.translate.stream(translated).pipe(
                map((trans) => {
                    const convertTranslated = Object.keys(trans).map((t) => ({
                        key: t.split('.').pop(),
                        translate: trans[t]
                    }));

                    if (Array.isArray(value)) {
                        return value.map((v) => {
                            const findTranslate = convertTranslated.find((el) => {
                                const title = CustomTranslatePipe.convertTitle(v.title, lowerCaseTransform);
                                return el.key === title;
                            });

                            return {
                                ...v,
                                title: findTranslate.translate
                            };
                        });
                    }
                    if (typeof value === 'string') {
                        // TODO
                    }
                    return null;
                })
            );
        }
        return null;
    }
}
