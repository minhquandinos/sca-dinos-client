import { InjectionToken, Provider } from '@angular/core';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { affiliateOfferListTableColumnsFactory } from './configs/affiliate-offer-list-table-columns.config';

export const AFFILIATE_OFFER_LIST_TABLE_COLUMNS_TOKEN = new InjectionToken<UiTable2ColumnsModel[]>('offersListTableColumns');

const columnsFactory = (platformSettingsQuery: PlatformSettingsQuery): UiTable2ColumnsModel[] =>
    affiliateOfferListTableColumnsFactory(platformSettingsQuery.settings);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AffiliateOffersListTableColumnsProvider: Provider = {
    provide: AFFILIATE_OFFER_LIST_TABLE_COLUMNS_TOKEN,
    useFactory: (platformSettingsQuery: PlatformSettingsQuery) => columnsFactory(platformSettingsQuery),
    deps: [PlatformSettingsQuery]
};
