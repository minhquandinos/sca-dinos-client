import { BaseObjectModel } from '@scaleo/core/data';
import {
    BaseTopPayloadDto,
    BaseTopQueryParamsDto,
    BaseTopRequestType,
    BaseTopWidgetModel
} from '@scaleo/dashboard/shared/widgets/top/common';
import { ReportFilterUnionType } from '@scaleo/reports/shared/filters/common';

export interface WidgetTopOfferRowsModel extends BaseTopWidgetModel {
    offer: string;
}

type TopOfferQueryParamsDto = BaseTopQueryParamsDto;

type TopOfferAvailableFilters = keyof Pick<Record<ReportFilterUnionType, string>, 'advertisers' | 'affiliates'>;

export type TopOfferAvailableFiltersDto = Partial<BaseObjectModel<TopOfferAvailableFilters, string>>;

type TopOfferPayloadDto = BaseTopPayloadDto<TopOfferAvailableFiltersDto>;

export type TopOfferRequestType = BaseTopRequestType<TopOfferQueryParamsDto, TopOfferPayloadDto>;
