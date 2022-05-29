import { Pipe, PipeTransform } from '@angular/core';

import { CustomParamsConditionsIdEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'isConditionId'
})
export class IsConditionIdPipe implements PipeTransform {
    transform(id: CustomParamsConditionsIdEnum, contains: CustomParamsConditionsIdEnum | CustomParamsConditionsIdEnum[]): boolean {
        return Array.isArray(contains) ? contains.includes(id) : contains === id;
    }
}
