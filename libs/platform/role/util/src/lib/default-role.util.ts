import { DefaultRoleEnum } from '@scaleo/platform/role/models';

export class DefaultRoleUtil {
    static all(): ReadonlyArray<DefaultRoleEnum | string> {
        return [
            DefaultRoleEnum.Admin,
            DefaultRoleEnum.Manager,
            DefaultRoleEnum.AdvertiserManager,
            DefaultRoleEnum.AffiliateManager,
            DefaultRoleEnum.Financial,
            DefaultRoleEnum.Affiliate,
            DefaultRoleEnum.Advertiser
        ];
    }

    static isDefaultManagers(role: DefaultRoleEnum | string): boolean {
        return DefaultRoleUtil.all().includes(role);
    }
}
