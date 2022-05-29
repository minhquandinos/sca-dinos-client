import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, take, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { RolePermissionListModel } from '@scaleo/feature/manager/settings/role/common';
import {
    ROLE_PERMISSION_LIST_PROVIDER,
    RolePermissionListQuery,
    RolePermissionListService
} from '@scaleo/feature-manager-settings-role-list-data-access';
import { RolePermissionUpsertConfigModel } from '@scaleo/feature-manager-settings-role-upsert-data-access';
import { ConfigurationUpsertComponent } from '@scaleo/feature-manager-settings-role-upsert-modal-form';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableConfigModel, UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

const TRANSLATE = 'settings.roles_permissions';
const TRANSLATE_COLUMNS = `${TRANSLATE}.list.columns`;

@Component({
    selector: 'scaleo-configuration-permission',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ROLE_PERMISSION_LIST_PROVIDER, UnsubscribeService]
})
export class RoleListComponent implements OnInit {
    readonly items$ = this.rolePermissionQuery.selectAll();

    readonly isLoad$ = this.rolePermissionQuery.isLoad$;

    readonly notFound$ = this.rolePermissionQuery.notFound$;

    readonly planFeature = PLATFORM_PLAN_FEATURE;

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'role',
            translateSchema: `${TRANSLATE_COLUMNS}.role`,
            width: '140px'
        },
        {
            value: 'type',
            translateSchema: '',
            width: 'auto'
        },
        {
            value: 'permissions',
            translateSchema: `${TRANSLATE_COLUMNS}.permissions`,
            width: 'auto'
        },
        {
            value: 'visibility',
            translateSchema: `${TRANSLATE_COLUMNS}.user_visibility`,
            width: '120px'
        }
    ];

    readonly tableConfig: UiSimpleTableConfigModel = {
        style: {
            properties: {
                colXPadding: '2rem'
            }
        }
    };

    constructor(
        private readonly rolePermissionService: RolePermissionListService,
        private readonly rolePermissionQuery: RolePermissionListQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3Service: Modal3Service
    ) {}

    ngOnInit(): void {
        this.rolePermissionService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    openModal(role?: DefaultRoleEnum | string) {
        let config: RolePermissionUpsertConfigModel;
        if (role) {
            const entity: RolePermissionListModel = this.rolePermissionQuery.getEntity(role);
            config = {
                title: entity?.label,
                base_role: entity?.base_role,
                role: entity?.role
            };
        }

        const modal = this.modal3Service.editForm<any, RolePermissionUpsertConfigModel>(ConfigurationUpsertComponent, {
            data: config
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
                this.rolePermissionService.reload();
            });
    }
}
