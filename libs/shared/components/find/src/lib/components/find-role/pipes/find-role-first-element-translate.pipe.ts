import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShortRoleModel } from '@scaleo/shared/data-access/short-entity-list';

@Pipe({
    name: 'findRoleFirstElementTranslate'
})
export class FindRoleFirstElementTranslatePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(value: ShortRoleModel[]): Observable<any> {
        return EMPTY;
        //
        // return of(value).pipe(
        //     switchMap(() => {
        //
        //     })
        // )
        //
        // this.translate.get('')
        // if (value)
        //
        // return this.translate?.stream(translateTitles).pipe(
        //     map((translated) =>
        //         values.map((value, index) => ({
        //             ...value,
        //             title: Object.values(translated)[index]
        //         }))
        //     )
        // );
    }
}
