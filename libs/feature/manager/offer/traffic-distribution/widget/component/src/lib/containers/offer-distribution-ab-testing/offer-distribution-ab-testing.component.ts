import { ChangeDetectionStrategy, Component, HostBinding, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { debounceTime, filter, map, startWith, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import {
    AbTestingLandingsService,
    OfferTrafficDistributionABTestingModel,
    OfferTrafficDistributionAbTestingService,
    OfferTrafficDistributionItemsControlDto,
    OfferTrafficDistributionQuery,
    OfferTrafficDistributionService
} from '@scaleo/feature/manager/offer/traffic-distribution/widget/data-access';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

@Component({
    selector: 'app-offer-distribution-ab-testing',
    templateUrl: './offer-distribution-ab-testing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class OfferDistributionAbTestingComponent implements OnInit {
    @HostBinding('class') className = 'distribution-ab-testing d-block overflow-auto';

    formArrayName = 'items';

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'landing_page',
            translateSchema: 'table.column.link'
        },
        {
            value: 'distribution',
            translateSchema: 'offers_page.traffic_distribution.distribution'
        },
        {
            value: 'added_date',
            translateSchema: 'table.column.added_date'
        },
        {
            value: 'clicks',
            translateSchema: 'table.column.clicks'
        },
        {
            value: 'conversion',
            translateSchema: 'table.column.conversion'
        },
        {
            value: 'cr',
            translateSchema: 'table.column.cr'
        }
    ];

    readonly items$: Observable<OfferTrafficDistributionABTestingModel[]> = this.distributionQuery.select('items');

    readonly loading$ = this.abTestingService.loading$;

    readonly landings$ = this.landingsService.landings$;

    form: FormGroup;

    readonly selectedLanding$ = this.landingsService.selectedLanding$;

    readonly showAddBtn$ = this.items$.pipe(map((items) => items.length < 52));

    constructor(
        private readonly distributionQuery: OfferTrafficDistributionQuery,
        private readonly distributionService: OfferTrafficDistributionService,
        private readonly abTestingService: OfferTrafficDistributionAbTestingService,
        private readonly fb: FormBuilder,
        private readonly unsubscribe: UnsubscribeService,
        private readonly landingsService: AbTestingLandingsService,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.offerDetailQuery.id$
            .pipe(
                filter((id) => !!id),
                switchMap((id) => this.abTestingService.index(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
        this.selectedLanding();
        this.calculateDistribution();
    }

    add(): void {
        this.abTestingService.addItem();
    }

    trackByFn(index: number, item: any) {
        return item?.id || index;
    }

    reloadDistributionItems(): void {
        this.abTestingService.reload();
    }

    reloadLandings(): void {
        this.landingsService.reloadLandings();
    }

    private initForm(): void {
        this.form = this.fb.group({
            items: this.fb.array([])
        });
    }

    private selectedLanding(): void {
        this.form
            .get(this.formArrayName)
            .valueChanges.pipe(
                startWith([]),
                map((items: OfferTrafficDistributionItemsControlDto[]) =>
                    items.length > 0 ? ArrayUtil.pickByKey(items, 'landing_page') : []
                ),
                tap((items: number[]) => {
                    this.landingsService.setSelectedLandingsId$(items);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private calculateDistribution(): void {
        this.form
            .get(this.formArrayName)
            .valueChanges.pipe(
                debounceTime(150),
                map((items: OfferTrafficDistributionItemsControlDto[]) => {
                    const sum = items
                        .map(({ distribution }) => +distribution)
                        .slice(1)
                        ?.reduce((acc, elem) => acc + elem, 0);

                    return sum > 0 ? 100 - sum : 100;
                }),
                tap((sum) => {
                    this.abTestingService.setDistribution(sum);
                    const [firstControl] = (this.form.get(this.formArrayName) as FormArray).controls;
                    firstControl.get('distribution').patchValue(sum, { emitEvent: false, onlySelf: false });
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
