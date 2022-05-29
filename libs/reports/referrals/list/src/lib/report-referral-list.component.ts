import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { ReportEnum } from '@scaleo/reports/common';
import { ReportReferralsService } from '@scaleo/reports/referrals/data-access';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { ReportLastUpdatedComponent } from '@scaleo/shared/components';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { ReportReferralListTableConfigModel } from './report-referral-list.model';

@Component({
    selector: 'scaleo-report-referrals',
    templateUrl: './report-referral-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: REPORTS_LAYOUT,
            useExisting: ReportsLayoutComponent
        }
    ]
})
export class ReportReferralListComponent implements OnInit, AfterViewInit, OnChanges {
    @Input()
    tableConfig: ReportReferralListTableConfigModel;

    @Input()
    items: any[];

    @Input()
    loading: boolean;

    @Input()
    pagination: ApiPaginationModel;

    @Input()
    initialDateRange: CustomDateRangeModel;

    @Input()
    showFilter: boolean;

    @Output()
    dateWasChanged: EventEmitter<CustomDateRangeModel> = new EventEmitter<CustomDateRangeModel>();

    @Output()
    pageWasChanged: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    perPageWasChanged: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    reload: EventEmitter<void> = new EventEmitter<void>();

    // TODO remove copy paste
    @ViewChild(ReportLastUpdatedComponent)
    set _reportLastUpdatedComponent(value: ReportLastUpdatedComponent) {
        if (value) {
            this.reportLastUpdatedComponent = value;
            this.reportLastUpdatedComponent.updated();
            this.reportLastUpdatedComponent$.next(this.reportLastUpdatedComponent);
        }
    }

    // TODO remove copy paste
    reportLastUpdatedComponent: ReportLastUpdatedComponent;

    // TODO remove copy paste
    reportLastUpdatedComponent$: BehaviorSubject<ReportLastUpdatedComponent> = new BehaviorSubject<ReportLastUpdatedComponent>(null);

    @ViewChild('layoutHeaderTpl', { static: true })
    layoutHeaderTpl: TemplateRef<any>;

    reportType = ReportEnum.Referrals;

    isLoad: boolean;

    // items$: Observable<ApiResponseWithPagination<StatisticInterface>>;
    //
    // defaultFilter: Filter2Interface;
    //
    // readonly slug = this.profile.slug;

    referralCommissionsTypeEnum = ReferralCommissionsTypeEnum;

    showBaseAmountField: boolean;

    referralCommissionCurrency: string;

    referralCommissionsType: ReferralCommissionsTypeEnum;

    @ViewChild('affiliateTestTpl', { static: true })
    private readonly affiliateTestTpl: TemplateRef<any>;

    @ViewChild('referredRateTestTpl', { static: true })
    private readonly referredRateTestTpl: TemplateRef<any>;

    configTest: {
        headers: UiTable2ColumnsModel[];
        rowsTemplate: ReadonlyMap<string, TemplateRef<any>>;
    };

    itemsTest = [
        {
            affiliate: 'test affiliate'
        }
    ];

    constructor(
        // public shared: SharedMethodsService,
        // public filter2Service: Filter2Service,
        private customDateRangeService: CustomDateRangeService,
        private reportReferralsService: ReportReferralsService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        private profile: ProfileQuery,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService
    ) {}

    ngOnInit(): void {
        this.configTest = {
            headers: [
                {
                    value: 'affiliate',
                    translate: 'table.column.affiliate'
                }
            ],
            rowsTemplate: new Map([
                ['affiliate', this.affiliateTestTpl],
                ['rate', this.referredRateTestTpl]
            ])
        };
        // this.setTableHeaders();
        // this.showBaseAmountField = this.referralTypeIsNotFlat;
        // this.referralCommissionsType = this.platformReferralSettingsService.referralCommissionsType;
        // this.referralCommissionCurrency = this.referralTypeIsNotFlat
        //     ? null
        //     : this.platformReferralSettingsService?.referralCommissionCurrency;
        // this.initItems();
    }

    ngAfterViewInit(): void {
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    ngOnChanges(changes: SimpleChanges) {
        const { items } = changes;

        if (items?.currentValue) {
            this.updateRefreshTimer();
        }
    }

    pageChange(page: number): void {
        this.pageWasChanged.emit(page);
    }

    perPageChange(parPage: number): void {
        this.perPageWasChanged.emit(parPage);
    }

    dateChange(date: CustomDateRangeModel): void {
        this.dateWasChanged.emit(date);
    }

    refreshed(): void {
        this.reload.emit();
        this.updateRefreshTimer();
    }

    private initItems(): void {
        // this.items$ = this.itemsSubject$.pipe(
        //     startWith(''),
        //     switchMap(() => this.restart$),
        //     tap(() => {
        //         this.isLoad = false;
        //     }),
        //     switchMap(() => this.filter2Service.filtersSubject$),
        //     switchMap((filters) => this.reportReferralsService.list(filters)),
        //     tap(() => {
        //         this.isLoad = true;
        //         this.updateRefreshTimer();
        //     })
        // );
    }

    // TODO remove copy paste
    get restart$(): Observable<boolean> {
        return this.reportLastUpdatedComponent$.pipe(switchMap((comp) => (comp?.restart$ ? comp?.restart$ : of(false))));
    }

    private updateRefreshTimer(): void {
        this.reportLastUpdatedComponent?.updated();
    }

    // private setTableHeaders(): void {
    //     const tableHeaders = [
    //         {
    //             translateKey: 'table.column.affiliate',
    //             key: 'affiliate',
    //             value: 'affiliate',
    //             excludeRole: [RoleEnum.Affiliate]
    //         },
    //         {
    //             translateKey: 'table.column.referral',
    //             key: 'referred_affiliate',
    //             value: 'referred_affiliate',
    //             excludeRole: []
    //         },
    //         {
    //             translateKey: 'table.column.rate',
    //             key: 'rate',
    //             value: 'rate',
    //             excludeRole: []
    //         },
    //         {
    //             translateKey: 'table.column.base_amount',
    //             key: 'base_amount',
    //             value: 'base_amount',
    //             textAlign: 'right',
    //             excludeRole: [RoleEnum.Affiliate]
    //         },
    //         {
    //             translateKey: 'referrals_page.form.referral_commission',
    //             key: 'referral_commission',
    //             value: 'referral_commission',
    //             textAlign: 'right',
    //             excludeRole: []
    //         }
    //     ];
    //
    //     this.tableHeaders = tableHeaders
    //         .filter((header) => !header.excludeRole.includes(this.profile.role))
    //         .map((header) => ({
    //             translateKey: header.translateKey,
    //             key: header.key,
    //             value: header.value,
    //             textAlign: header?.textAlign
    //         }))
    //         .filter((header) => this.additionalHeaderFilterByRole(header));
    // }

    // private additionalHeaderFilterByRole(header: UiTableHeaderInterface): boolean {
    //     if (
    //         this.profile.role === RoleEnum.Admin ||
    //         this.profile.role === RoleEnum.Manager ||
    //         this.profile.role === RoleEnum.LimitedAffiliateManager
    //     ) {
    //         if (!this.referralTypeIsNotFlat && header.key === 'base_amount') {
    //             return false;
    //         }
    //
    //         if (!this.referralTypeIsNotFlat && header.key === 'rate') {
    //             return false;
    //         }
    //     }
    //
    //     if (this.profile.role === RoleEnum.Affiliate) {
    //         if (this.platformReferralSettingsService.referralCommissionsType === ReferralCommissionsTypeEnum.Flat) {
    //             this.referralCommissionCurrency = this.platformReferralSettingsService.referralCommissionCurrency;
    //             return header.key !== 'rate';
    //         }
    //     }
    //
    //     return true;
    // }

    // private get referralTypeIsNotFlat(): boolean {
    //     return this.platformReferralSettingsService.referralCommissionsType !== ReferralCommissionsTypeEnum.Flat;
    // }
}
