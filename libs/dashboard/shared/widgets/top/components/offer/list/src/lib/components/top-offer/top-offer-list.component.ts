import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject, take, takeUntil } from 'rxjs';
import { first, share, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { BASE_TOP_COLUMN_FACTORY, BASE_TOP_COLUMN_TOKEN, BaseTopComponent } from '@scaleo/dashboard/shared/widgets/top/common';
import {
    TOP_OFFER_PROVIDER,
    TopOfferAvailableFiltersDto,
    TopOfferService,
    WidgetTopOfferRowsModel
} from '@scaleo/dashboard/shared/widgets/top/components/offer/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatService } from '@scaleo/platform/format/service';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportsService } from '@scaleo/reports/state';
import { NavigateRootPipe, NavigateRootQueryParamsType, NavigateRootService } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTableHeaderInterface, UiTableSortInterface } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { topOfferDefaultConfig } from '../../configs';

@Component({
    selector: '' + 'scaleo-top-offer-list',
    templateUrl: './top-offer-list.component.html',
    styleUrls: ['./top-offer-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [UnsubscribeService, NavigateRootPipe, BASE_TOP_COLUMN_FACTORY(topOfferDefaultConfig, 'value'), TOP_OFFER_PROVIDER]
})
export class TopOfferListComponent extends BaseTopComponent<WidgetTopOfferRowsModel> implements OnInit {
    @Input() filters: TopOfferAvailableFiltersDto;

    @ViewChild('footerTpl', { static: true })
    footerTpl: TemplateRef<any>;

    @Output() initFooterEvent: EventEmitter<TemplateRef<any>> = new EventEmitter();

    datePreset$: Observable<any>;

    constructor(
        public shared: SharedMethodsService,
        private topOfferService: TopOfferService,
        private profileQuery: ProfileQuery,
        private customDateRangeService: CustomDateRangeService,
        private reportService: ReportsService,
        private navigateRootPipe: NavigateRootPipe,
        private translate: TranslateService,
        private format: FormatService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly navigateRoot: NavigateRootService,
        @Inject(BASE_TOP_COLUMN_TOKEN) public configs: UiTableHeaderInterface[],
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super();
        this.headers = this.configs;
    }

    ngOnInit(): void {
        this.topOfferService
            .data$(this.defaultTrigger$, this.defaultDate$, this.filters)
            .pipe(
                tap(() => {
                    this.isLoad = false;
                }),
                tap((items: WidgetTopOfferRowsModel[]) => {
                    this.calculateMaxRevenue(items);
                    this.initFooterEvent.emit(items.length > 0 ? this.footerTpl : undefined);
                }),
                tap(() => {
                    this.isLoad = true;
                }),
                takeUntil(this.unsubscribe),
                share()
            )
            .subscribe((items) => {
                this.items = items;
            });

        this.datePreset$ = DateUtil.periodLabel(this.date$, this.translate, this.format);
    }

    toReport() {
        this.date$.pipe(take(1)).subscribe((date) => {
            this.reportService.updateDate({
                rangeFrom: date.rangeFrom,
                rangeTo: date.rangeTo
            });

            let queryParams: NavigateRootQueryParamsType;
            if (this.filters) {
                const [key, value] = ArrayUtil.first(Object.entries(this.filters));
                if (key && value) {
                    queryParams = {
                        [key]: value
                    };
                }
            }

            this.navigateRoot.navigate('/reports/statistics/offer', queryParams);
        });
    }

    sortingColumn(sort: UiTableSortInterface): void {
        this.topOfferService.sorting(sort);
    }

    private calculateMaxRevenue(items: WidgetTopOfferRowsModel[]) {
        this.maxRevenueValue = this.getMaxRevenueValue(items, 'value');
    }

    private get defaultTrigger$(): Subject<any> {
        return this.trigger$ || new Subject();
    }

    private get defaultDate$(): Observable<CustomDateRangeModel> {
        const { rangeFrom, rangeTo, baseSelectedRange: preset } = this.customDateRangeService;

        return (
            this.date$ ||
            of({
                rangeFrom,
                rangeTo,
                preset
            })
        );
    }
}
