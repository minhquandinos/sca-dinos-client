import { RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { ShortEntityNameEnum } from '../enums/short-entity-name.enum';
import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { FirstActiveAffiliate } from './first-active-affiliate';
import { GetShortOffer } from './get-short-offer';
import { ShortAdvertiser } from './short-advertiser';
import { ShortAffiliate } from './short-affiliate';
import { ShortBaseRole } from './short-base-role';
import { ShortGeoNames } from './short-geo-names';
import { ShortManager } from './short-manager';
import { ShortOfferLandingPage } from './short-offer-landing-page';
import { ShortOperatingSystem } from './short-operating-system';
import { ShortPaymentMethod } from './short-payment-method';
import { ShortRole } from './short-role';
import { ShortSponsor } from './short-sponsor';

export class ShortEntityListFactory {
    constructor(
        private rest: RestApiService,
        private serviceName: keyof Record<ShortEntityNameEnum, string>,
        private jsonConvertService: JsonConvertService,
        private pathFileService: PathFileService
    ) {}

    get service(): ShortEntityListInterface {
        const servicesMap: {
            [K in keyof Record<ShortEntityNameEnum, string>]: InstanceType<any>;
        } = {
            [ShortEntityNameEnum.Affiliates]: new ShortAffiliate(this.rest),
            [ShortEntityNameEnum.ActiveAffiliate]: new FirstActiveAffiliate(this.rest),
            [ShortEntityNameEnum.Offers]: new GetShortOffer(this.rest),
            [ShortEntityNameEnum.Advertisers]: new ShortAdvertiser(this.rest),
            [ShortEntityNameEnum.GeoNames]: new ShortGeoNames(this.rest),
            [ShortEntityNameEnum.LandingPage]: new ShortOfferLandingPage(this.rest),
            [ShortEntityNameEnum.Sponsor]: new ShortSponsor(this.rest),
            [ShortEntityNameEnum.Managers]: new ShortManager(this.rest, this.jsonConvertService, this.pathFileService),
            [ShortEntityNameEnum.PaymentMethods]: new ShortPaymentMethod(this.rest),
            [ShortEntityNameEnum.OperatingSystem]: new ShortOperatingSystem(this.rest),
            [ShortEntityNameEnum.Role]: new ShortRole(this.rest),
            [ShortEntityNameEnum.BaseRole]: new ShortBaseRole(this.rest)
        };

        return servicesMap[this.serviceName] || undefined;
    }
}
