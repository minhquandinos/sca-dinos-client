import { ChangeDetectionStrategy, Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { ShortOfferLandingPageModel } from '../../../../../../../../../../../../shared/data-access/short-entity-list/src/lib/models';
import { AbTestingLandingsService } from '../../../../../../../data-access/src/lib/services/ab-testing-landings.service';

@Component({
    selector: 'app-offer-distribution-ab-testing-landings',
    templateUrl: './offer-distribution-ab-testing-landings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class OfferDistributionAbTestingLandingsComponent {
    @Input() landings: ShortOfferLandingPageModel[];

    @Input() disabledControl: boolean;

    constructor(private readonly service: AbTestingLandingsService) {}

    customSearchFn(term: string, item: ShortOfferLandingPageModel) {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term;
    }

    scrolledLandingsToEnd(): void {
        this.service.scrolledLandingsToEnd();
    }

    searchLanding(search: string): void {
        this.service.updateLandingsParams('search', search);
    }
}
