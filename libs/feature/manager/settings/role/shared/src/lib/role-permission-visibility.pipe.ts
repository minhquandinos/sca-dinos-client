import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { RolePermissionListVisibilityEnum } from '@scaleo/feature/manager/settings/role/common';

const TRANSLATE = 'settings.roles_permissions.list.visibility';

const translateMap: BaseObjectModel = {
    [RolePermissionListVisibilityEnum.AllUser]: `${TRANSLATE}.${RolePermissionListVisibilityEnum.AllUser}`,
    [RolePermissionListVisibilityEnum.AssignedUsersOnly]: `${TRANSLATE}.${RolePermissionListVisibilityEnum.AssignedUsersOnly}`
};

@Pipe({
    name: 'rolePermissionVisibility'
})
export class RolePermissionVisibilityPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}
    transform(value: RolePermissionListVisibilityEnum): Observable<string> {
        const translate = translateMap[value];
        return translate ? this.translate.stream(translate) : EMPTY;
    }
}
