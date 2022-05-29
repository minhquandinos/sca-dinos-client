import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { DashboardSummaryMenuType, DashboardSummaryService } from '@scaleo/dashboard-old/shared/widgets/summary/data-access';
import { ConfigTableColumnService, StatisticOutputParameterInterface } from '@scaleo/shared/components';

@Component({
    selector: 'app-dashboard-summary-chart-type',
    templateUrl: './dashboard-summary-chart-type.component.html',
    providers: [UnsubscribeService]
})
export class DashboardSummaryChartTypeComponent implements OnInit {
    @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

    menu: DashboardSummaryMenuType = 'volume';

    breakdown = 'day';

    breakdownsItems: any[] = [
        {
            title: 'hour',
            value: 'hour'
        },
        {
            title: 'day',
            value: 'day'
        },
        {
            title: 'month',
            value: 'month'
        },
        {
            title: 'year',
            value: 'year'
        }
    ];

    columnConfig$: Observable<StatisticOutputParameterInterface[]>;

    columnConfigSubject$: BehaviorSubject<DashboardSummaryMenuType> = new BehaviorSubject<DashboardSummaryMenuType>('volume');

    constructor(
        private configTableColumnService: ConfigTableColumnService,
        private dashboardSummaryService: DashboardSummaryService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.dashboardSummaryService.breakdown.next(this.breakdown);
        this.columnConfig$ = this.columnConfigSubject$.pipe(switchMap((type) => this.dashboardSummaryService.getOptions(type)));

        this.configTableColumnService.columnsPayload$.pipe(takeUntil(this.unsubscribe)).subscribe((columns) => {
            this.dashboardSummaryService.columns.next(columns);
        });
    }

    switchMenu(type: DashboardSummaryMenuType): void {
        if (this.menu !== type) {
            this.menu = type;
            // this.initLocalStorage();
            this.columnConfigSubject$.next(type);
            this.toggleMenu.emit();
        }
    }

    changeBreakdown(): void {
        this.dashboardSummaryService.breakdown.next(this.breakdown);
    }

    // private storeColumnsToLocalStorage(columns: string): void {
    //     // const filter: Filter2Interface = {
    //     //     payload: { columns }
    //     // };
    //     //
    //     // this.localStorage.store(filter);
    // }

    // private get getColumnsFromLocalStorage(): string {
    //     return '';
    //     // const data = this.localStorage.get();
    //     // return data && data.payload.columns ? data.payload.columns : null;
    // }

    // initLocalStorage(): void {
    //     // let localStorageName = `scaleo_dahsboard_chart`;
    //     // if (this.dashboardSummaryService.localStorageName.value) {
    //     //     localStorageName = this.dashboardSummaryService.localStorageName.value;
    //     // }
    //     // this.localStorage = new LocalStorageClass(`${localStorageName}_${this.menu}`);
    //     // if (this.getColumnsFromLocalStorage) {
    //     //     this.configTableColumnService.setColumns(this.getColumnsFromLocalStorage);
    //     // } else {
    //     //     this.configTableColumnService.setColumns(null);
    //     // }
    // }
}
