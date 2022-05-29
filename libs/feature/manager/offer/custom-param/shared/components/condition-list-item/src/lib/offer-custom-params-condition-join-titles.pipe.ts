import { Pipe, PipeTransform } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { CustomParamsConditionsIdEnum } from '@scaleo/platform/list/access-data';

import { OfferCustomParamsConditionTitlePipe } from './offer-custom-params-condition-title.pipe';

@Pipe({
    name: 'offerCustomParamsConditionJoinTitles'
})
export class OfferCustomParamsConditionJoinTitlesPipe implements PipeTransform {
    constructor(private readonly offerCustomParamsConditionTitlePipe: OfferCustomParamsConditionTitlePipe) {}

    transform(conditions: BaseIdTitleModel[] | number[], type: CustomParamsConditionsIdEnum): Observable<string> {
        const titles$: Observable<string>[] = conditions.map((condition) =>
            this.offerCustomParamsConditionTitlePipe.transform(condition, type).pipe(take(1))
        );
        return forkJoin(titles$).pipe(map((titles) => titles.join(', ')));
    }
}
