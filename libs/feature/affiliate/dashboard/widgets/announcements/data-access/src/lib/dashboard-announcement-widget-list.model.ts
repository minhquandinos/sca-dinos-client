import { Expose, Transform } from 'class-transformer';

import { PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

export type AnnouncementsListOnMyOffersType = 'on' | 'yes';

export type AffiliateDashboardAnnouncementsListQueryParamsModel = PageRequestModel &
    StatusRequestModel &
    SortRequestModel &
    SearchRequestModel & {
        onMyOffers?: AnnouncementsListOnMyOffersType;
    };

export interface AffiliateDashboardAnnouncementWidgetListDto {
    author: string;
    author_id: number;
    author_role: number;
    connected_offers: string;
    connected_offers_selected: string;
    content: string;
    created: number;
    emails_sent_flag: number;
    id: number;
    image: string;
    pin_to_top: number;
    title: string;
}

export class AffiliateDashboardAnnouncementWidgetListModel {
    @Expose()
    @Transform(
        ({ value }) => {
            const author = Util.jsonParse(value, {});
            return author ? [author] : [];
        },
        { toClassOnly: true }
    )
    author: ShortManagerModel[] = [];

    @Expose()
    author_id: number;

    @Expose()
    author_role: number;

    @Expose()
    connected_offers: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    connected_offers_selected: string[];

    @Expose()
    content: string;

    @Expose()
    created: number;

    @Expose()
    emails_sent: number;

    @Expose()
    emails_sent_flag: number;

    @Expose()
    id: number;

    @Expose()
    image: string;

    @Expose()
    pin_to_top: number;

    @Expose()
    title: string;

    @Expose()
    updated: number;

    @Expose()
    @Transform(({ value }) => (value || '')?.split(','), { toClassOnly: true })
    visible_for: string[];
}
