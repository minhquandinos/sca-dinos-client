import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { BASE_ROLE, BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';

const TRANSLATE = 'settings.roles_permissions.list.role_info';

const translateBaseRoleMap: BaseObjectModel = {
    [BASE_ROLE.admin]: `${TRANSLATE}.admin`,
    [BASE_ROLE.manager]: `${TRANSLATE}.manager`,
    [BASE_ROLE.affiliateManager]: `${TRANSLATE}.affiliate_manager`,
    [BASE_ROLE.advertiserManager]: `${TRANSLATE}.advertiser_manager`
};

const translateDefaultRoleMap: BaseObjectModel = {
    [DefaultRoleEnum.Financial]: `${TRANSLATE}.financial_manager`
};

@Pipe({
    name: 'rolePermissionInfo'
})
export class RolePermissionInfoPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(baseRole: BaseRoleType, defaultRole: DefaultRoleEnum): Observable<string> {
        const baseRoleTranslate = translateBaseRoleMap[baseRole];
        const defaultRoleTranslate = translateDefaultRoleMap[defaultRole];
        const translate = defaultRoleTranslate ? defaultRoleTranslate : baseRoleTranslate;
        return translate ? this.translate.stream(translate) : EMPTY;
    }
}
