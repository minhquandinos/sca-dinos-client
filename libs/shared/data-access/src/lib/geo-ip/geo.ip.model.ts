export interface GeoIpModel {
    id: number;
    title: string;
    country_code?: string;
    country_title?: string;
    region_code?: number;
    region_title?: string;
    selected?: boolean;
    disabled?: boolean;
    image?: string;
}

export interface GeoIpParamsModel {
    search?: string;
    lang?: string;
    perPage?: number;
    country?: string;
    region?: any;
    geoname_id?: number | null;
    country_id?: number;
    page: number;
}
