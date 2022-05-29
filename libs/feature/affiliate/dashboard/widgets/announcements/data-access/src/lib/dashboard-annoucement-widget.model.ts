export type AnnouncementsType = 'all' | 'offers';

export interface AnnouncementsWidgetMenus {
    count: number;
    title: AnnouncementsMenuEnum;
    countKey: string;
}

export enum AnnouncementsMenuEnum {
    All = 'all',
    Offers = 'offers'
}

export interface AnnouncementsCountInterface {
    'all-count': number;
    'onMyOffers-count': number;
}
