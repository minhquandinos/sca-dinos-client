import { ProfileQuery } from '@scaleo/account/data-access';
import { RoleEnum } from '@scaleo/platform/role/models';

export enum DashboardTopEnum {
    Affiliates = 'affiliates',
    Offers = 'offers'
}
/*
 * @Deprecated
 * not used this
 * */
export class DashboardTopConfig {
    private readonly defaultColumns: string[] = ['clicks', 'cv_total', 'total_revenue'];

    constructor(private profile: ProfileQuery) {}

    public getHeaders(type: DashboardTopEnum): string[] {
        let headers: string[];
        switch (type) {
            case DashboardTopEnum.Affiliates:
                headers = ['affiliate', 'clicks', 'conversions', 'approved_revenue'];
                break;
            case DashboardTopEnum.Offers:
            default:
                headers = ['offers', 'clicks', 'conversions', 'approved_revenue'];
                break;
        }

        if (this.profile.role === RoleEnum.LimitedAffiliateManager) {
            return headers.map((header) => (header === 'approved_revenue' ? 'approved_payout' : header));
        }

        return headers;
    }

    get columns(): string {
        if (this.profile.role === RoleEnum.LimitedAffiliateManager) {
            return this.defaultColumns.map((column) => (column === 'total_revenue' ? 'total_payout' : column)).join(',');
        }
        return this.defaultColumns.join(',');
    }
}
