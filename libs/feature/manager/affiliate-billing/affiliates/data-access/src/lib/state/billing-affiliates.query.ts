import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, pluck } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { UiTable2ColumnDirectionType, UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import { BillingAffiliatesParamsStateModel, BillingAffiliatesRequestModel } from '../models/billing-affiliates.model';
import { BillingAffiliatesState, BillingAffiliatesStore } from './billing-affiliates.store';

@Injectable()
export class BillingAffiliatesQuery extends BaseEntityQuery<BillingAffiliatesState> {
    readonly sortField$: Observable<string> = this.selectParamsValue$('sortField');

    readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.selectParamsValue$('sortDirection');

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    constructor(
        protected readonly store: BillingAffiliatesStore,
        private platformSettingsQuery: PlatformSettingsQuery,
        private profileQuery: ProfileQuery
    ) {
        super(store);
    }

    get params$(): Observable<BillingAffiliatesParamsStateModel> {
        return this.selectParams$();
    }

    get prepareParams$(): Observable<BillingAffiliatesRequestModel> {
        return objectUtil.mutationKeyWhenValuesChanges(this.selectParams$(), 'page', 1).pipe(
            map((params: BillingAffiliatesParamsStateModel) => {
                return {
                    ...params,
                    invoice_frequency: ArrayUtil.join(params.invoice_frequency),
                    payment_terms: ArrayUtil.join(params.payment_terms),
                    payment_methods: ArrayUtil.join(params.payment_methods)
                };
            })
        );
    }

    get pagination$(): Observable<ApiPaginationModel> {
        return this.selectDataValue$('pagination');
    }

    get columns$(): Observable<UiTable2ColumnsModel[]> {
        const ignoreColumnSort = ['managers', 'payment_methods'];
        return this.selectParamsValue$('columns').pipe(
            debounceTime(0),
            map((columns) => this.filteredColumns(columns)),
            map((columns: string[]) =>
                columns.map((column) => ({
                    value: column,
                    translate: `table.column.${column}`,
                    sort: !ignoreColumnSort.includes(column)
                }))
            )
        );
    }

    // TODO remove after backend work currently
    private filteredColumns(columns: string): string[] {
        const { affReferralProgram, show_the_balance_of_pending_conversions: balancePendingRejection } =
            this.platformSettingsQuery.settings;

        const arrColumns = columns.split(',');

        const balancePendingRejectionExceptRole: BaseRoleType[] = [
            BASE_ROLE.admin,
            BASE_ROLE.manager,
            BASE_ROLE.affiliateManager,
            BASE_ROLE.advertiserManager
        ];

        return arrColumns.filter((column) => {
            if (column === 'pending_balance') {
                return balancePendingRejectionExceptRole.includes(this.profileQuery.baseRole) && balancePendingRejection;
            }

            if (column === 'referral_balance') {
                return affReferralProgram;
            }

            return true;
        });
    }
}
