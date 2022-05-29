import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { LEADS_LOGS_PROVIDER, LeadsLogEnum, LeadsLogsQuery, LeadsLogsService } from '@scaleo/feature/manager/leads/logs/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { UiTabModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-leads-logs',
    templateUrl: './leads-logs.component.html',
    providers: [LEADS_LOGS_PROVIDER, UnsubscribeService]
})
export class LeadsLogsComponent implements OnInit {
    private readonly leadsLogType: LeadsLogEnum = this.route.snapshot.data['logType'];

    public readonly items$ = this.leadsLogsQuery.selectAll();

    public readonly loading$ = this.leadsLogsQuery.select('loading');

    public readonly columns$ = this.leadsLogsQuery.columns$;

    public readonly pagination$ = this.leadsLogsQuery.pagination$;

    public readonly columnsOptions$ = this.leadsLogs.getColumnsOptions(this.leadsLogType);

    public readonly rangeFrom$ = this.leadsLogsQuery.rangeFrom$;

    public readonly rangeTo$ = this.leadsLogsQuery.rangeTo$;

    public readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    public readonly menus: UiTabModel[] = this.getMenus;

    readonly filters$ = this.leadsLogsQuery.selectPayloadValue$('filters');

    constructor(
        private leadsLogs: LeadsLogsService,
        private leadsLogsQuery: LeadsLogsQuery,
        private route: ActivatedRoute,
        private unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.setActiveTabs();
    }

    ngOnInit(): void {
        this.leadsLogs.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    dateWasChange({ rangeFrom, rangeTo }: CustomDateRangeModel) {
        this.leadsLogs.updatePayloadValue({
            rangeTo,
            rangeFrom
        });
    }

    pageWasChanged(page: number) {
        this.leadsLogs.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number) {
        this.leadsLogs.updateParamsValue({ perPage });
    }

    columnChanged(columns: string[]) {
        this.leadsLogs.updatePayloadValue({
            columns: columns.join(',')
        });
    }

    trackByFn(index: number): number {
        return index;
    }

    private setActiveTabs() {
        this.leadsLogs.updatePayloadValue({ logType: this.leadsLogType });
    }

    private get getMenus(): UiTabModel[] {
        return [
            {
                title: 'leads_ui_page.logs.incoming',
                route: LeadsLogEnum.Incoming
            },
            {
                title: 'leads_ui_page.logs.outgoing',
                route: LeadsLogEnum.Outgoing
            },
            {
                title: 'leads_ui_page.logs.changing',
                route: LeadsLogEnum.Changing
            }
        ];
    }
}
