import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, filter, pluck, startWith, switchMap, take } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';

import { PROFILE_API_STATUS } from '@scaleo/account/common';
import { AuthAsService } from '@scaleo/auth/as/service';
import { BooleanEnum, SortByType } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { RolePermissionListVisibilityEnum } from '@scaleo/feature/manager/settings/role/common';
import { TEAMMATE_LIST_PROVIDER, TeammateListQuery, TeammateListService } from '@scaleo/feature/manager/settings/teammate/list/data-access';
import { ManagerCreateComponent } from '@scaleo/feature/manager/settings/teammate/upsert/modal-form';
import { PlatformListsStatusesEnum, PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService, UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-teammate-list',
    templateUrl: './teammate-list.component.html',
    styleUrls: ['./teammate-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [TEAMMATE_LIST_PROVIDER, UnsubscribeService]
})
export class TeammateListComponent implements OnInit {
    @HostBinding('class')
    hostClass = 'teammate-list';

    readonly items$ = this.teammateListQuery.selectAll();

    readonly loading$ = this.teammateListQuery.selectLoading();

    readonly pagination$ = this.teammateListQuery.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly showPagination$ = combineLatest<[boolean, number]>([this.loading$, this.totalCount$]).pipe(
        map(([loading, total]) => !loading && total > 9),
        share()
    );

    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending];

    filterForm: FormGroup;

    readonly apiStatus = PROFILE_API_STATUS;

    readonly booleanEnum = BooleanEnum;

    readonly columns: UiTable2ColumnsModel[] = [
        {
            value: 'manager',
            translate: 'settings.teammates.title',
            colWidth: '30%',
            maxWidth: '40%'
        },
        {
            value: 'permissions',
            translate: 'settings.roles_permissions.list.columns.permissions',
            colWidth: '25%',
            maxWidth: '30%'
        },
        {
            value: 'user_visibility',
            translate: 'settings.teammates.list.columns.users_visibility'
        },
        {
            value: 'visited',
            translate: 'settings.teammates.list.columns.last_login'
        },
        {
            value: 'properties',
            translate: 'table.column.properties'
        }
    ];

    readonly platformListsStatuses = PlatformListsStatusesEnum;

    readonly rolePermissionListVisibility = RolePermissionListVisibilityEnum;

    readonly defaultRole = DefaultRoleEnum;

    readonly test$ = this.translate.onLangChange.pipe(
        startWith(this.translate.currentLang),
        switchMap(() => this.translate.stream('shared.dictionary.role'))
    );

    constructor(
        private teammateListService: TeammateListService,
        private teammateListQuery: TeammateListQuery,
        public modal3Service: Modal3Service,
        private route: ActivatedRoute,
        private router: Router,
        private authAsService: AuthAsService,
        private toastr: ToastrBarService,
        private formBuilder: FormBuilder,
        private readonly unsubscribe: UnsubscribeService,
        private readonly translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.initFilterForm();

        this.teammateListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    public setFilterStatus(status: PlatformListsStatusesNameEnum): void {
        this.teammateListService.updateParamsValue({ status });
    }

    public setFilterManager(role: DefaultRoleEnum): void {
        this.teammateListService.updateParamsValue({ role });
    }

    public orderBy(sortField: string): void {
        this.teammateListService.updateParamsValue({ sortField });
    }

    sortBy(sortDirection: SortByType): void {
        this.teammateListService.updateParamsValue({ sortDirection });
    }

    searching(search: string): void {
        this.teammateListService.updateParamsValue({ search, page: 1 });
    }

    openModal(id?: number): void {
        const modal = this.modal3Service.editForm(ManagerCreateComponent, {
            data: {
                editId: id || null
            }
        });

        modal.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.teammateListService.reload();
            });
    }

    public pageWasChanged(page: number): void {
        this.teammateListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.teammateListService.updateParamsValue({ perPage, page: 1 });
    }

    loginAs(email: string): void {
        this.authAsService.login(email);
    }

    private initFilterForm(): void {
        this.filterForm = this.formBuilder.group({
            status: [this.teammateListQuery.getParamsValue('status') || ''],
            role: [this.teammateListQuery.getParamsValue('role') || '']
        });
    }
}
