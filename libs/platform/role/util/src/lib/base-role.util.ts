import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';

export class BaseRoleUtil {
    static all(): ReadonlyArray<BaseRoleType | string> {
        return [BASE_ROLE.admin, BASE_ROLE.manager, BASE_ROLE.advertiserManager, BASE_ROLE.affiliateManager];
    }

    static isBaseRole(role: BaseRoleType | string): boolean {
        return BaseRoleUtil.all().includes(role);
    }
}
