import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { BaseIdTitleModel, BaseObjectModel } from '@scaleo/core/data';
import { CustomParamsConditionsIdEnum } from '@scaleo/platform/list/access-data';
import { PlatformListTranslatePipe } from '@scaleo/platform/list/pipe';

@Pipe({
    name: 'offerCustomParamsConditionTitle'
})
export class OfferCustomParamsConditionTitlePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService, private readonly platformListTranslatePipe: PlatformListTranslatePipe) {}

    transform(title: BaseIdTitleModel | number, type: CustomParamsConditionsIdEnum): Observable<string> {
        const platformListMap: BaseObjectModel = {
            [CustomParamsConditionsIdEnum.DeviceType]: 'device_types',
            [CustomParamsConditionsIdEnum.ConnectionType]: 'connection_types'
        };

        const platformList = platformListMap[type];
        return typeof title === 'number'
            ? this.platformListTranslatePipe.transform(title, platformList)
            : this.translate.stream(title.title);
    }
}
