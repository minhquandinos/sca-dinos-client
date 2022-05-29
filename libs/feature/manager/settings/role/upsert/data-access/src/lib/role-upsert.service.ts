import { Injectable } from '@angular/core';
import { Logger } from 'codelyzer/util/logger';
import { EMPTY, map, Observable } from 'rxjs';

import { BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';
import { ArrayUtil } from '@scaleo/utils';

import { RoleUpsertApi } from './role-upsert.api';
import {
    PermissionFormControlGroupsModel,
    PermissionFormControlModel,
    PermissionUpsertConfigureGroupModel,
    PermissionUpsertPayloadOptionsType,
    PermissionUpsertViewModel,
    RolePermissionCreatePayloadDto,
    RolePermissionUpdatePayloadDto,
    RolePermissionUpsertGroupsPayloadDto
} from './role-upsert.model';

@Injectable()
export class RoleUpsertService {
    constructor(private readonly api: RoleUpsertApi) {}

    roles(): Observable<any> {
        return this.api.roles();
    }

    view(role: string): Observable<PermissionUpsertViewModel> {
        return this.api.view(role);
    }

    viewConfigure(role: string): Observable<PermissionUpsertConfigureGroupModel[]> {
        return this.api.viewConfigure(role).pipe(
            map((configure) => {
                const key = 'user_visibility';
                const userVisibility = ArrayUtil.findByKey(configure, 'key', key);
                const newConfigure = ArrayUtil.removeByKey(configure, 'key', key);
                return [userVisibility, ...newConfigure];
            })
        );
    }

    create(payload: PermissionFormControlModel): Observable<PermissionUpsertViewModel> {
        const { groups, role, title } = payload;
        const newGroups = this.convertGroups(groups);

        const newPayload: RolePermissionCreatePayloadDto = {
            base_role: role as BaseRoleType,
            title,
            groups: newGroups
        };

        return this.api.create(newPayload);
    }

    update(payload: PermissionFormControlModel, options: PermissionUpsertPayloadOptionsType): Observable<PermissionUpsertViewModel> {
        const { groups, role, title } = payload;
        const newGroups = this.convertGroups(groups);
        let newPayload: Partial<RolePermissionUpdatePayloadDto>;

        if (options?.allowedCustomRole) {
            newPayload = {
                role,
                title,
                groups: newGroups
            };
        } else {
            newPayload = {
                title
            };
        }
        return this.api.update(newPayload);
    }

    delete(role: DefaultRoleEnum | string): Observable<void> {
        return this.api.delete(role);
    }

    private convertGroups(groups: PermissionFormControlGroupsModel[]): RolePermissionUpsertGroupsPayloadDto[] {
        return groups.reduce((acc, elem) => {
            const groupId = ArrayUtil.first(elem.items)?.group_id;
            const ids = elem.items.filter(({ item }) => !!item).map(({ id, item }) => id || item);
            acc.push({ group_id: groupId, ids });
            return acc;
        }, []);
    }
}
