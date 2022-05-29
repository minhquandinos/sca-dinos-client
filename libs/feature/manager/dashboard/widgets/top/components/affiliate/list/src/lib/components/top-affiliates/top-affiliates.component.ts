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
import { Observable, take, takeUntil } from 'rxjs';
import { first, share, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { BASE_TOP_COLUMN_FACTORY, BASE_TOP_COLUMN_TOKEN, BaseTopComponent } from '@scaleo/dashboard/shared/widgets/top/common';
import {
    TOP_AFFILIATES_REVENUE_FIELD,
    TopAffiliatesConfigModel,
    WidgetTopAffiliateRowsModel
} from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/common';
import {
    MANGER_TOP_AFFILIATE_PROVIDER,
    TopAffiliatesService
} from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/data-access';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatService } from '@scaleo/platform/format/service';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportsService } from '@scaleo/reports/state';
import { NavigateRootQueryParamsType, NavigateRootService } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTableSortInterface } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { topAffiliatesDefaultColumnsConfig } from '../../configs/top-affiliates-default-columns.config';

@Component({
    selector: 'scaleo-manager-top-affiliates',
    templateUrl: './top-affiliates.component.html',
    styleUrls: ['./top-affiliates.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        UnsubscribeService,
        BASE_TOP_COLUMN_FACTORY(topAffiliatesDefaultColumnsConfig, TOP_AFFILIATES_REVENUE_FIELD),
        MANGER_TOP_AFFILIATE_PROVIDER
    ]
})
export class TopAffiliatesComponent extends BaseTopComponent<WidgetTopAffiliateRowsModel> implements OnInit {
    @Input() offerId: number;

    @ViewChild('footerTpl', { static: true })
    footerTpl: TemplateRef<any>;

    @Output() initFooterEvent: EventEmitter<TemplateRef<any>> = new EventEmitter();

    datePreset$: Observable<string>;

    constructor(
        public readonly shared: SharedMethodsService,
        private readonly service: TopAffiliatesService,
        private readonly reportService: ReportsService,
        private readonly translate: TranslateService,
        private readonly format: FormatService,
        private readonly navigateRoot: NavigateRootService,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(BASE_TOP_COLUMN_TOKEN) private readonly configs: TopAffiliatesConfigModel,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super();
        this.headers = this.configs;
    }

    ngOnInit(): void {
        this.datePreset$ = this.getDatePreset$;

        this.initItems$();
    }

    sortingColumn(sort: UiTableSortInterface): void {
        this.service.sorting(sort);
    }

    toReport(): void {
        this.date$.pipe(take(1)).subscribe((date) => {
            this.reportService.updateDate({
                rangeFrom: date.rangeFrom,
                rangeTo: date.rangeTo
            });

            let queryParams: NavigateRootQueryParamsType;
            if (this.offerId) {
                queryParams = {
                    [ReportFilterFilterEnum.Offer]: this.offerId
                };
            }

            this.navigateRoot.navigate('/reports/statistics/affiliate', queryParams);
        });
    }

    private initItems$(): void {
        this.service
            .data$(this.date$, this.offerId)
            .pipe(
                tap(() => {
                    this.isLoad = false;
                }),
                tap((items: WidgetTopAffiliateRowsModel[]) => {
                    this.calculateMaxRevenue(items);
                    const footerTpl: TemplateRef<any> = items.length > 0 ? this.footerTpl : undefined;
                    this.initFooterEvent.emit(footerTpl);
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
    }

    private calculateMaxRevenue(items: WidgetTopAffiliateRowsModel[]) {
        this.maxRevenueValue = this.getMaxRevenueValue(items, 'value');
    }

    private get getDatePreset$(): Observable<string> {
        return DateUtil.periodLabel(this.date$, this.translate, this.format);
    }
}
