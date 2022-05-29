import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import {
    InvalidTrafficForwardingEnum,
    InvalidTrafficForwardingTranslateEnum
} from '../../../../data-access/src/lib/enums/invalid-traffic-forwarding.enum';

@Pipe({
    name: 'failTrafficForwardingName'
})
export class FailTrafficForwardingNamePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(type: InvalidTrafficForwardingEnum): Observable<string> {
        const INVALID_TRAFFIC_FORWARDING_TRANSLATE_MAP = {
            [InvalidTrafficForwardingEnum.MainDestinationUrl]: InvalidTrafficForwardingTranslateEnum.MainDestinationUrl,
            [InvalidTrafficForwardingEnum.PreviewUrl]: InvalidTrafficForwardingTranslateEnum.PreviewUrl,
            [InvalidTrafficForwardingEnum.Offer]: InvalidTrafficForwardingTranslateEnum.Offer,
            [InvalidTrafficForwardingEnum.CustomTrafficbackUrl]: InvalidTrafficForwardingTranslateEnum.CustomTrafficbackUrl,
            [InvalidTrafficForwardingEnum.GlobalTrafficbackUrl]: InvalidTrafficForwardingTranslateEnum.GlobalTrafficbackUrl
        };
        return type ? this.translate.stream(INVALID_TRAFFIC_FORWARDING_TRANSLATE_MAP[type]) : EMPTY;
    }
}
