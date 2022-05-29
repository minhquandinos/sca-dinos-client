import { Injectable } from '@angular/core';
import { persistState } from '@datorama/akita';

import { ProfileQuery } from '@scaleo/account/data-access';
import { LocalAsyncStorageService } from '@scaleo/core/storage/local';
import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { BaseReportState, BaseReportStore, initialBaseReport, initialBaseReportPersistState } from '@scaleo/reports/common';
import { ReportFilter, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

import { ManagerOfferListState } from '../../../../../../offer/list/data-access/src/lib/state/manager-offer-list.store';

export type LeadsListState = BaseReportState;

const defaultFilters = [ReportFilterFilterEnum.Affiliate, ReportFilterFilterEnum.Offer, ReportFilterFilterEnum.Advertiser];

const storeName = ManagerStateNameEnum.Leads;

@Injectable()
export class LeadsListStore extends BaseReportStore<LeadsListState> {
    constructor(private profile: ProfileQuery, private readonly storage: LocalAsyncStorageService) {
        super(
            initialBaseReport({
                filters: ReportFilter.initialPageFilters(storage.getItem(storeName, 'filters') || defaultFilters),
                columns: storage.getItem(storeName, 'columns')
            }),
            {
                name: storeName
            }
        );
        const storageName = `${profile.role}__${storeName}`;
        initialBaseReportPersistState(storeName, storageName);
    }
}
