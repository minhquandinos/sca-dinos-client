import { AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';

import { OfferTrafficDistributionQuery } from '@scaleo/feature/manager/offer/traffic-distribution/widget/data-access';

export function distributionAsyncValidation(query: OfferTrafficDistributionQuery): AsyncValidatorFn {
    return (): Observable<ValidationErrors | null> =>
        query.select('distribution').pipe(
            debounceTime(300),
            map((value) => {
                if (value < 0) {
                    return {
                        required: true
                    };
                }
                return null;
            }),
            take(1)
        );
}
