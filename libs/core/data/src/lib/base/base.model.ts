export type BaseObjectModel<K extends number | string | symbol = string, T = any> = {
    [key in K]: T;
};

export interface BaseIdTitleModel<ID = number> {
    id: ID;
    title: string;
}

export interface BaseShortEntityModel extends BaseIdTitleModel {
    [key: string]: unknown;
}

export interface ShortResponseInterface {
    id: number;
    title: string;
    type?: number;
    [key: string]: unknown;
}
