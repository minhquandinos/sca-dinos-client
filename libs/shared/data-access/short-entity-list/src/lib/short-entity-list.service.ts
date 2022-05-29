import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponseWithPagination, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { ShortEntityListFactory } from './classes';
import { ShortEntityNameEnum } from './enums/short-entity-name.enum';
import {
    ShortAdvertiserConfigModel,
    ShortAdvertiserModel,
    ShortAffiliateConfigModel,
    ShortAffiliateModel,
    ShortGeoNameConfigModel,
    ShortGeoNameModel,
    ShortManagerConfigModel,
    ShortManagerModel,
    ShortOfferConfigModel,
    ShortOfferLandingConfigModel,
    ShortOfferLandingPageModel,
    ShortOfferModel,
    ShortSponsorConfigModel,
    ShortSponsorModel
} from './models';
import { ShortBaseRoleModel } from './models/short-base-role.model';
import { ShortPaymentMethodConfigModel, ShortPaymentMethodModel } from './models/short-payment-method.model';
import { ShortRoleModel } from './models/short-role.model';

@Injectable({
    providedIn: 'root'
})
export class ShortEntityListService {
    constructor(
        private rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly pathFileService: PathFileService
    ) {}

    list(
        service: ShortEntityNameEnum.Affiliates,
        config: ShortAffiliateConfigModel
    ): Observable<ApiResponseWithPagination<ShortAffiliateModel[]>>;
    list(service: ShortEntityNameEnum.ActiveAffiliate): Observable<ShortAffiliateModel[]>;
    list(
        service: ShortEntityNameEnum.Advertisers,
        config: ShortAdvertiserConfigModel
    ): Observable<ApiResponseWithPagination<ShortAdvertiserModel[]>>;
    list(service: ShortEntityNameEnum.Offers, config: ShortOfferConfigModel): Observable<ApiResponseWithPagination<ShortOfferModel[]>>;
    list(
        service: ShortEntityNameEnum.GeoNames,
        config: ShortGeoNameConfigModel
    ): Observable<ApiResponseWithPagination<ShortGeoNameModel[]>>;
    list(
        service: ShortEntityNameEnum.LandingPage,
        config: ShortOfferLandingConfigModel
    ): Observable<ApiResponseWithPagination<ShortOfferLandingPageModel[]>>;
    list(service: ShortEntityNameEnum.Sponsor, config: ShortSponsorConfigModel): Observable<ApiResponseWithPagination<ShortSponsorModel[]>>;
    list(
        service: ShortEntityNameEnum.Managers,
        config: ShortManagerConfigModel
    ): Observable<ApiResponseWithPagination<ShortManagerModel[]>>;
    list(
        service: ShortEntityNameEnum.PaymentMethods,
        config: ShortPaymentMethodConfigModel
    ): Observable<ApiResponseWithPagination<ShortPaymentMethodModel[]>>;
    list(service: ShortEntityNameEnum.Role): Observable<ShortRoleModel[]>;
    list(service: ShortEntityNameEnum.BaseRole): Observable<ShortBaseRoleModel[]>;
    list(service: any, config?: BaseObjectModel): Observable<any> {
        const create = new ShortEntityListFactory(this.rest, service, this.jsonConvertService, this.pathFileService);

        return create?.service.list(config);
    }
}
