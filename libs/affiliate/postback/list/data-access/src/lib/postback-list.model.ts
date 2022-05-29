import { Expose } from 'class-transformer';

import { BaseIdTitleModel, PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';

export class AffiliatePostbackListModel {
    @Expose()
    id: number;

    @Expose()
    level_id: number;

    @Expose()
    level_name?: string;

    @Expose()
    offer_id: number;

    @Expose()
    offer_name: string = undefined;

    @Expose()
    get offerName(): string {
        return this.offer_selected?.title || this.offer_name || '';
    }

    @Expose()
    offer_selected: BaseIdTitleModel = undefined;

    @Expose()
    goal_id: number;

    @Expose()
    goal_name: string;

    @Expose()
    get goalName(): string {
        return this.goal_selected?.title || '';
    }

    @Expose()
    goal_selected?: BaseIdTitleModel = undefined;

    @Expose()
    conversion_status: number;

    @Expose()
    type: number;

    @Expose()
    type_name?: string;

    @Expose()
    code: string;

    @Expose()
    status: number;

    @Expose()
    affiliate_id: number;

    @Expose()
    created: number;

    @Expose()
    updated: number;
}

export interface AffiliatePostbackListQueryParamsDto extends StatusRequestModel, SortRequestModel, PageRequestModel, SearchRequestModel {
    type?: 'all' | string;
}
