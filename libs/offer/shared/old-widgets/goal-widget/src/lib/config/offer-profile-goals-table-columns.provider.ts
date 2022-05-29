import { InjectionToken, Provider } from '@angular/core';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

import { offerProfileGoalsColumnsFactory } from './offer-profile-goals-table-columns.config';

export const OFFER_PROFILE_GOALS_TABLE_COLUMNS_TOKEN = new InjectionToken<UiTableHeaderInterface[]>('offerProfileGoalsColumns');

const columnsFactory = (mediaWatcherService: MediaWatcherService): UiTableHeaderInterface[] =>
    offerProfileGoalsColumnsFactory(mediaWatcherService.isMobile);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OfferProfileGoalsColumnsProvider: Provider = {
    provide: OFFER_PROFILE_GOALS_TABLE_COLUMNS_TOKEN,
    useFactory: (mediaWatcherService: MediaWatcherService) => columnsFactory(mediaWatcherService),
    deps: [MediaWatcherService]
};
