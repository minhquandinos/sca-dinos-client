import { InjectionToken, Provider } from '@angular/core';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { UiSimpleTableHeaderModel, UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { transformAffiliatePaymentsMethods } from '../transforms/affiliate-payments-methods-columns.transform';

export const AFFILIATE_PAYMENTS_METHODS_COLUMNS_TOKEN = new InjectionToken<UiTable2ColumnsModel[]>('affiliatePaymentsMethodsColumns');

const columnsFactory = (platformSettingsQuery: PlatformSettingsQuery): UiSimpleTableHeaderModel[] =>
    transformAffiliatePaymentsMethods(platformSettingsQuery.settings);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AffiliatePaymentsMethodsColumnsProvider: Provider = {
    provide: AFFILIATE_PAYMENTS_METHODS_COLUMNS_TOKEN,
    useFactory: (platformSettingsQuery: PlatformSettingsQuery) => columnsFactory(platformSettingsQuery),
    deps: [PlatformSettingsQuery]
};
