import { Expose, Transform, Type } from 'class-transformer';

import { BaseIdTitleModel, BaseObjectModel } from '@scaleo/core/data';
import { PlatformCurrencyModel } from '@scaleo/platform/currency/models';

import { AFFILIATE_VISIBILITY_MAP } from '../constants/platform-list';
import { ASSIGN_NEW_USER_MAP } from '../constants/platform-list/assign-new-user.const';
import { ANNOUNCEMENT_STATUS_MAP, OFFERS_REQUEST_STATUS_MAP } from '../constants/statuses';
import { AffiliateVisibilityIdEnum, AffiliateVisibilityNameEnum } from '../enums/platform-list/affiliate-visibility.enum';
import { OfferRequestStatusEnum } from '../enums/statusses';
import {
    PlatformListsBaseInterface,
    PlatformListsFormatAdjustmentConditionsInterface,
    PlatformListsFormatInterface
} from './platform.lists.interface';

export class PlatformListsFormatModel {
    @Expose()
    id: string | number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    name?: string = undefined;
}

export interface PlatformListStatusModel extends BaseIdTitleModel {
    status: string;
}

export interface PlatformListAffiliateVisibilityModel extends BaseIdTitleModel<AffiliateVisibilityIdEnum> {
    key: AffiliateVisibilityNameEnum;
}

export interface PlatformListOffersRequestsStatusesModel extends BaseIdTitleModel<OfferRequestStatusEnum> {
    key: OfferRequestStatusEnum;
}

interface PlatformListTrafficDistributionMethodModel extends BaseIdTitleModel {
    is_default: boolean;
}

export class PlatformListModel {
    @Expose()
    media_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    traffic_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    payment_terms?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    messengers?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    affiliates_tags?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    // @Transform(
    //     ({ value }) => {
    //         let statuses = addStatusName(value);
    //         statuses = sortStatuses(statuses);
    //         return statuses;
    //     },
    //     { toClassOnly: true }
    // )
    statuses?: PlatformListStatusModel[];

    @Expose()
    currencies?: PlatformCurrencyModel[] = [];

    @Expose()
    languages?: PlatformListsBaseInterface[] = undefined;

    @Expose()
    timezones?: BaseObjectModel[] = undefined;

    @Expose()
    roles?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    datetime_formats?: PlatformListsBaseInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    payment_statuses?: PlatformListStatusModel[];

    @Expose()
    per_pages?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    postback_levels?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    conversion_statuses?: PlatformListStatusModel[];

    @Expose()
    tracking_methods?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    // @Transform(
    //     ({ value }) => {
    //         let statuses = addStatusName(value);
    //         statuses = sortStatuses(statuses);
    //         return statuses;
    //     },
    //     { toClassOnly: true }
    // )
    offers_statuses?: PlatformListStatusModel[];

    @Expose()
    goals_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    goals_statuses?: PlatformListStatusModel[];

    @Expose()
    offer_urls_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    offer_urls_statuses?: PlatformListStatusModel[];

    @Expose()
    offers_targeting_rules?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    creatives_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    creatives_statuses?: PlatformListStatusModel[];

    @Expose()
    @Transform(() => AFFILIATE_VISIBILITY_MAP, { toClassOnly: true })
    affiliate_visibility?: PlatformListAffiliateVisibilityModel[];

    @Expose()
    @Transform((): any => OFFERS_REQUEST_STATUS_MAP, { toClassOnly: true })
    offers_requests_statuses?: PlatformListOffersRequestsStatusesModel[];

    @Expose()
    goals_caps_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    goals_caps_periods?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    connection_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    // @Transform(({ value }) => formatDeviceTypes(value), { toClassOnly: true })
    device_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    offers_visibility?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    forwarding_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    number_formats?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    date_formats?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    postback_tracking_methods?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    goal_tracking_methods?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    postback_statuses?: PlatformListStatusModel[];

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    adjustments_statuses?: PlatformListStatusModel[];

    @Expose()
    adjustments_actions?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    adjustments_conditions?: PlatformListsFormatAdjustmentConditionsInterface[] = undefined;

    @Expose()
    adjustments_optional_parameters?: PlatformListsFormatAdjustmentConditionsInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    custom_params_statuses?: PlatformListStatusModel[];

    @Expose()
    custom_params_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    custom_params_conditions?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    custom_params_actions?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    payments_types?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    payments_frequencies?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => addStatusName(value), { toClassOnly: true })
    payments_methods_statuses?: PlatformListStatusModel[];

    @Expose()
    redirects_reasons?: PlatformListsFormatInterface[] = undefined;

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    leads_receive_fields?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    traffic_distribution?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    leads_receive_validations_type_format?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    leads_receive_validations_type_duplicate_offer?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    leads_receive_validations_type_duplicate_all_offer?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    leads_receive_validations_type?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    invoices_payments_terms?: PlatformListsFormatModel[];

    @Expose()
    @Transform(({ value }) => value?.map((elem: any) => ({ id: elem.key, status: elem.key, title: elem.title })), {
        toClassOnly: true
    })
    invoices_statuses?: PlatformListStatusModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    invoices_frequencies_for_filter?: PlatformListsFormatModel[];

    @Expose()
    @Type((): any => PlatformListsFormatModel)
    invoices_payments_terms_for_filter?: PlatformListsFormatModel[];

    @Expose()
    traffic_distribution_methods?: PlatformListTrafficDistributionMethodModel[];

    @Expose()
    @Transform((): any => ASSIGN_NEW_USER_MAP, { toClassOnly: true })
    assign_new_user?: PlatformListsFormatModel[];

    @Expose()
    @Transform((): any => ANNOUNCEMENT_STATUS_MAP, { toClassOnly: true })
    announcement_statuses?: PlatformListStatusModel[];

    @Expose()
    offers_availability?: PlatformListsFormatModel[];
}

const addStatusName = (values: PlatformListStatusModel[]): any[] =>
    values?.map((elem) => ({ ...elem, status: elem.title.replace(/ /g, '_').toLowerCase() }));
//
// const sortStatuses = (values: PlatformListStatusModel[]): PlatformListStatusModel[] => {
//     const status = [];
//     values?.forEach((obj) => {
//         switch (obj.title.toLowerCase()) {
//             case 'active':
//                 status.splice(0, 0, obj);
//                 break;
//             case 'pending':
//                 status.splice(1, 0, obj);
//                 break;
//             case 'testing':
//                 status.splice(2, 0, obj);
//                 break;
//             case 'inactive':
//                 status.splice(3, 0, obj);
//                 break;
//             default:
//                 break;
//         }
//     });
//
//     return status;
// };
//
// const formatDeviceTypes = (values: PlatformListsFormatInterface[]): PlatformListsFormatInterface[] =>
//     values?.map((type) => ({
//         ...type,
//         title: type.title === 'Smartphone' ? 'Phone' : type.title
//     }));
