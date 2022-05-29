import { Pipe, PipeTransform } from '@angular/core';

import { ShortOfferLandingPageModel } from '../../../../../../../../../../../../../shared/data-access/short-entity-list/src/lib/models';

@Pipe({
    name: 'offerDistributionLandingExclude'
})
export class OfferDistributionLandingExcludePipe implements PipeTransform {
    transform(landings: ShortOfferLandingPageModel[] = [], currentId: number, selectedIds: number[]): ShortOfferLandingPageModel[] {
        return landings?.filter(({ id }) => id === currentId || !selectedIds.includes(id));
    }
}
