import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActivityLogRequestModel } from '@scaleo/activity-log/common';
import {
    ACTIVITY_LOG_ENTITY_WIDGET_PROVIDER,
    ActivityLogEntityWidgetQuery,
    ActivityLogEntityWidgetService
} from '@scaleo/activity-log/shared/widgets/activity-log-entity/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CheckPermissionService } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil, NavigateRootPipe } from '@scaleo/shared/components';

@Component({
    selector: 'scaleo-activity-log-entity-detail-widget',
    templateUrl: './activity-log-entity-detail-widget.component.html',
    providers: [ACTIVITY_LOG_ENTITY_WIDGET_PROVIDER, NavigateRootPipe, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityLogEntityDetailWidgetComponent implements OnInit, OnChanges {
    @Input() linkForViewAll: string;

    @Input() filter: { [T in keyof 'affiliate' | 'offer' | 'advertiser']?: number };

    @Input()
    permissions: any;

    readonly items$ = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly isLoad$ = this.query.isLoad$;

    readonly notFound$ = this.query.notFound$;

    canManager$: Observable<boolean> = of(false);

    readonly totalCount$ = this.pagination$.pipe(map((pagination) => pagination?.total_count));

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    constructor(
        private readonly router: Router,
        private readonly translateService: TranslateService,
        private readonly service: ActivityLogEntityWidgetService,
        private readonly query: ActivityLogEntityWidgetQuery,
        private readonly navigateRootPipe: NavigateRootPipe,
        private readonly unsubscribe: UnsubscribeService,
        private readonly checkPermissionService: CheckPermissionService
    ) {}

    ngOnInit() {
        if (!this.filter) {
            this.loadItems();
        }
        this.canManager$ = this.checkPermissionService.check$(this.permissions);
    }

    ngOnChanges(changes: SimpleChanges) {
        const { filter } = changes;

        if (filter?.currentValue) {
            this.loadItems();
        }
    }

    private loadItems(): void {
        // const params = this.getParams;
        this.service.index(this.filter).pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    navigate(): void {
        const url = this.linkForViewAll ? `${this.router.url}/${this.linkForViewAll}` : this.navigateRootPipe.transform('/activity-log');
        this.router.navigate([url]);
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }
}
