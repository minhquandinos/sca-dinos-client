import { Expose, Transform } from 'class-transformer';

import { SignUpInfoModel } from '@scaleo/auth/data';
import {
    BaseObjectModel,
    ColumnsRequestModel,
    ExportFileFormatRequestModel,
    LangRequestModel,
    PageRequestModel,
    SearchRequestModel,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { TableConversionLiveStatsModel } from '@scaleo/shared/components';
import { ContactModel } from '@scaleo/shared/components/contact';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

export class AdvertiserListModel {
    @Expose()
    id: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
    tags_selected: string = undefined;

    @Expose()
    firstname: string = undefined;

    @Expose()
    lastname: string = undefined;

    @Expose()
    company_name: string = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    status: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    private registration: SignUpInfoModel = undefined;

    @Expose()
    created: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    managers_assigned: ShortManagerModel[] = [];

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    contacts: ContactModel[] = [];

    @Expose()
    email: string = undefined;

    @Expose()
    phone?: string = undefined;

    @Expose()
    account_type?: number = undefined;

    @Expose()
    live_stats: TableConversionLiveStatsModel = undefined;
}

export interface AdvertiserListQueryParamsDto
    extends LangRequestModel,
        PageRequestModel,
        SortRequestModel,
        StatusRequestModel,
        SearchRequestModel {
    tags?: string;
    countries?: string;
    managers?: string;
    onlyMine?: 'yes' | '';
}

export interface AdvertiserListQueryParamsModel
    extends LangRequestModel,
        PageRequestModel,
        SortRequestModel,
        StatusRequestModel,
        SearchRequestModel {
    tags?: string[];
    countries?: number[];
    managers?: number[];
    onlyMine?: 'yes' | '';
}

export interface AdvertisersExportQueryParamsDto extends AdvertiserListQueryParamsDto, ExportFileFormatRequestModel, ColumnsRequestModel {}
