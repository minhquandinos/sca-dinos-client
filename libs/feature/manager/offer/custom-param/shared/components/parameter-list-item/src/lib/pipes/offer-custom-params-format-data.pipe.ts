import { Pipe, PipeTransform } from '@angular/core';

import { OfferCustomParametersParametersModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { GoalCapTypeEnum } from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { FormatService } from '@scaleo/platform/format/service';
import { CustomParamsActionIdEnum, GoalTypeEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'offerCustomParamsFormatData'
})
export class OfferCustomParamsFormatDataPipe implements PipeTransform {
    constructor(private formatService: FormatService) {}

    transform(item: OfferCustomParametersParametersModel, currency: CurrencyEnum): string | OfferCustomParametersParametersModel {
        const { type, parameter, goal_id, cap_type } = item;
        switch (type) {
            case CustomParamsActionIdEnum.Payout:
            case CustomParamsActionIdEnum.Revenue:
                if (goal_id.type === GoalTypeEnum.CPS) {
                    return this.formatService.format(parameter, 'percent');
                }
                return this.formatService.format(parameter, 'money', { currency });
            case CustomParamsActionIdEnum.ThrottleRatePending:
            case CustomParamsActionIdEnum.ThrottleRateRejected:
                return this.formatService.format(parameter, 'percent');
            case CustomParamsActionIdEnum.TrafficBackURL:
                return parameter as string;
            case CustomParamsActionIdEnum.TrafficBackOffer:
            case CustomParamsActionIdEnum.ForceRedirect:
                if (typeof parameter !== 'string') {
                    return this.formatService.format(parameter.title, 'idName', parameter.id);
                }
                return parameter;
            case CustomParamsActionIdEnum.DailyCap:
            case CustomParamsActionIdEnum.MonthlyCap:
            case CustomParamsActionIdEnum.TotalCap:
            case CustomParamsActionIdEnum.WeeklyCap:
                if (cap_type === GoalCapTypeEnum.Budget) {
                    return this.formatService.format(parameter, 'money', {
                        currency,
                        digitsAfterPoint: 2
                    });
                }
                return this.formatService.format(parameter, 'number');
            default:
                return this.formatService.format(parameter, 'number');
        }
    }
}
