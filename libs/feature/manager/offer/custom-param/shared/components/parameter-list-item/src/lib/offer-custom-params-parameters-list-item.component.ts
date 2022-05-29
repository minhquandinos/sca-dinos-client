import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OfferCustomParametersParametersModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { FormatService } from '@scaleo/platform/format/service';
import { PlatformListTranslatePipe } from '@scaleo/platform/list/pipe';

@Component({
    selector: 'app-offer-custom-params-parameters-list-item',
    templateUrl: './offer-custom-params-parameters-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PlatformListTranslatePipe]
})
export class OfferCustomParamsParametersListItemComponent implements OnChanges {
    @Input() parameter: OfferCustomParametersParametersModel;

    @Input() isTooltip: boolean;

    @Input() limitChip = 2;

    readonly offerCurrency: string;

    parameterTitle$: Observable<string>;

    constructor(
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly translate: TranslateService,
        private readonly platformListTranslatePipe: PlatformListTranslatePipe,
        private readonly format: FormatService
    ) {
        this.offerCurrency = this.offerDetailQuery.currency;
    }

    ngOnChanges(changes: SimpleChanges) {
        const { parameter } = changes;
        if (parameter.currentValue) {
            this.initParameterTitle$();
        }
    }

    private initParameterTitle$(): void {
        const { type, goal_id } = this.parameter;
        this.parameterTitle$ = this.platformListTranslatePipe.transform(type, 'custom_params_actions').pipe(
            map((actionType: string) => {
                const goalFormat = goal_id ? this.format.format(goal_id.title, 'idName', goal_id.id) : null;
                const forTranslate = this.translate.instant('interface.basic.for');
                return goalFormat ? `${actionType} ${forTranslate} ${goalFormat}:` : `${actionType}:`;
            })
        );
    }
}
