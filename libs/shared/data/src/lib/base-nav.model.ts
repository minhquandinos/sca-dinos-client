export interface BaseNavModel {
    id?: string;
    title: string;
    routeLink: string;
}

export interface BaseNavGroupModel {
    title: string;
    items: BaseNavModel[];
}
