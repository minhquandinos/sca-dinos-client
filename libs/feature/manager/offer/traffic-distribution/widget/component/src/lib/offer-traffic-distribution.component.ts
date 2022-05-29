import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, first, map, skip, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import {
    OFFER_TRAFFIC_DISTRIBUTION_PROVIDER,
    OfferTrafficDistributionMethodEnum,
    OfferTrafficDistributionQuery,
    OfferTrafficDistributionService
} from '@scaleo/feature/manager/offer/traffic-distribution/widget/data-access';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { DayPresetChangedModel, DayPresetsComponent, NavigateRootService } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';

import { OfferDistributionAbTestingComponent } from './containers/offer-distribution-ab-testing/offer-distribution-ab-testing.component';

@Component({
    selector: 'scaleo-manager-offer-traffic-distribution',
    templateUrl: './offer-traffic-distribution.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_TRAFFIC_DISTRIBUTION_PROVIDER, UnsubscribeService]
})
export class OfferTrafficDistributionComponent implements OnInit {
    form: FormGroup;

    readonly method$ = this.offerTrafficDistributionQuery.getMethod$;

    @ViewChild(DayPresetsComponent, { static: false }) set dayPresetsComponent(dayPresetsComponent: DayPresetsComponent) {
        if (dayPresetsComponent) {
            this.setDatePreset(dayPresetsComponent.selected);
        }
    }

    readonly showBtnToReport$ = this.method$.pipe(map((method) => method !== OfferTrafficDistributionMethodEnum.None));

    readonly isMethodAbTesting$ = this.method$.pipe(map((method) => method === OfferTrafficDistributionMethodEnum.ABTesting));

    @ViewChild(OfferDistributionAbTestingComponent)
    private readonly offerDistributionAbTesting: OfferDistributionAbTestingComponent;

    constructor(
        private readonly distributionService: OfferTrafficDistributionService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly fb: FormBuilder,
        private readonly offerTrafficDistributionQuery: OfferTrafficDistributionQuery,
        private readonly cdr: ChangeDetectorRef,
        private readonly navigateRootService: NavigateRootService,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.offerDetailQuery.id$
            .pipe(
                filter((id) => !!id),
                switchMap((id) => this.distributionService.getMethod(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
        this.loadMethod();
    }

    changePreset(event: DayPresetChangedModel) {
        this.setDatePreset(event);
    }

    updateMethod(event: SelectChangeModel) {
        this.distributionService.updateMethod(this.offerDetailQuery.id, event.newValue).pipe(first()).subscribe();
    }

    toReport() {
        this.navigateRootService.navigate('/reports/statistics/general', {
            offers: this.offerDetailQuery.id,
            breakdown: BreakdownEnum.LandingPage
        });
    }

    reloadDistribution(): void {
        if (this.selectedMethod === OfferTrafficDistributionMethodEnum.ABTesting) {
            this.offerDistributionAbTesting.reloadDistributionItems();
            this.offerDistributionAbTesting.reloadLandings();
        }
    }

    reloadLandingPage(): void {
        if (this.selectedMethod === OfferTrafficDistributionMethodEnum.ABTesting) {
            this.offerDistributionAbTesting.reloadLandings();
        }
    }

    private initForm(): void {
        this.form = this.fb.group({
            method: [this.offerTrafficDistributionQuery.getValue().method]
        });
    }

    private loadMethod(): void {
        this.offerTrafficDistributionQuery
            .select('method')
            .pipe(
                skip(1),
                tap((method) => {
                    this.form.get('method').patchValue(method);
                    this.cdr.markForCheck();
                }),
                first()
            )
            .subscribe();
    }

    private setDatePreset({ rangeFrom, rangeTo }: DayPresetChangedModel): void {
        this.distributionService.updateQueryParams({ rangeFrom, rangeTo });
    }

    private get selectedMethod(): OfferTrafficDistributionMethodEnum {
        return this.form.get('method').value;
    }
}
