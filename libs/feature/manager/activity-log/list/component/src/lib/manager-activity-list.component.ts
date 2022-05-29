import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Observable, pluck, switchMap, takeUntil } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_ACTIVITY_LOG_LIST_PROVIDER,
    ManagerActivityLogListDateRangePlaceEnum,
    ManagerActivityLogListQuery,
    ManagerActivityLogListRouteDataEnum,
    ManagerActivityLogListService
} from '@scaleo/feature/manager/activity-log/list/data-access';
import { MANAGER_ENTITY_DETAIL_TOKEN } from '@scaleo/feature/manager/common/entity-detail';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { FindManagersComponent } from '@scaleo/shared/components/find';
import { SelectChangeModel } from '@scaleo/shared/components/select';

@Component({
    selector: 'scaleo-manager-activity-list',
    templateUrl: './manager-activity-list.component.html',
    providers: [MANAGER_ACTIVITY_LOG_LIST_PROVIDER, UnsubscribeService]
})
export class ManagerActivityListComponent implements OnInit {
    items$ = this.managerActivityLogListQuery.selectAll();

    pagination$ = this.managerActivityLogListQuery.selectDataValue$('pagination');

    totalCount$ = this.pagination$.pipe(pluck('total_count'));

    loading$ = this.managerActivityLogListQuery.selectLoading();

    initialData$: Observable<CustomDateRangeModel> = this.managerActivityLogListQuery.selectParams$().pipe(
        map(({ rangeFrom, rangeTo }) => {
            return {
                rangeFrom,
                rangeTo
            };
        })
    );

    readonly headers: string[] = ['added_timestamp', 'event', 'user_role', 'user', 'user_ip'];

    filterForm: FormGroup;

    readonly managers$ = this.managerActivityLogListQuery.selectParamsValue$('managers');

    readonly showOutputManagers$ = this.managers$.pipe(map((managers) => managers?.length));

    readonly managersCount$ = this.managers$.pipe(map((managers) => managers?.length || 0));

    private _dataRangePosition$: Observable<ManagerActivityLogListDateRangePlaceEnum> = this.route.data.pipe(
        pluck(ManagerActivityLogListRouteDataEnum.DataRangePosition)
    );

    readonly dataRangeInHeader$: Observable<boolean> = this._dataRangePosition$.pipe(
        map((position) => position === ManagerActivityLogListDateRangePlaceEnum.HeaderContainer)
    );

    readonly dataRangeInFilter$: Observable<boolean> = this._dataRangePosition$.pipe(
        map((position) => position === ManagerActivityLogListDateRangePlaceEnum.FilterContainer)
    );

    readonly headerTitle$: Observable<string> = this.route.data.pipe(
        pluck(ManagerActivityLogListRouteDataEnum.CardHeaderTitle),
        filter((title) => !!title),
        switchMap((title) => this.translate.stream(title))
    );

    @ViewChild(FindManagersComponent)
    private set _findManagersRef(component: FindManagersComponent) {
        if (!this.findManagersRef && component) {
            this.findManagersRef = component;
        }
    }

    findManagersRef: FindManagersComponent;

    constructor(
        private readonly managerActivityLogListService: ManagerActivityLogListService,
        private readonly managerActivityLogListQuery: ManagerActivityLogListQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly fomBuilder: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly translate: TranslateService,
        @Optional() @Inject(MANAGER_ENTITY_DETAIL_TOKEN) private readonly entityId: any,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.initFilterForm();
        this.route.data
            .pipe(
                pluck('listQueryParams'),
                switchMap((filterName) => {
                    const entityFilter: BaseObjectModel = filterName && this.entityId ? { [filterName]: this.entityId } : undefined;
                    return this.managerActivityLogListService.index(entityFilter);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private initFilterForm(): void {
        this.filterForm = this.fomBuilder.group({
            managers: [this.managerActivityLogListQuery.getParamsValue('managers')],
            role: [this.managerActivityLogListQuery.getParamsValue('role')]
        });
    }

    managerChange(): void {
        this.managerActivityLogListService.updateParamsValue({ managers: this.filterForm.get('managers').value });
    }

    managersRoleChange(event: SelectChangeModel): void {
        this.managerActivityLogListService.updateParamsValue({ role: event.newValue });
    }

    clearManagers(event: boolean) {
        if (event) {
            this.managerActivityLogListService.updateParamsValue({ managers: [] });
            this.filterForm.get('managers').patchValue([]);
        }
    }

    removeManagerElement(event: number) {
        const paramValue = this.managerActivityLogListService.getParamsValue('managers');
        const newValue = paramValue.filter((value) => value !== event);
        this.managerActivityLogListService.updateParamsValue({ managers: newValue });
        this.filterForm.get('managers').patchValue(newValue);
    }

    dateWasChanged({ rangeFrom, rangeTo }: CustomDateRangeModel): void {
        this.managerActivityLogListService.updateParamsValue({ rangeFrom, rangeTo });
    }

    pageWasChanged(page: number): void {
        this.managerActivityLogListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number): void {
        this.managerActivityLogListService.updateParamsValue({ perPage, page: 1 });
    }
}
