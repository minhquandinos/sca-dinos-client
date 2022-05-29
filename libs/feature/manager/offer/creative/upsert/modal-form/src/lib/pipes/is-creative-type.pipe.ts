import { Pipe, PipeTransform } from '@angular/core';

import { CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'isCreativeType'
})
export class IsCreativeTypePipe implements PipeTransform {
    transform(type: CreativeTypesIdEnum, contains: CreativeTypesIdEnum | CreativeTypesIdEnum[]): boolean {
        return Array.isArray(contains) ? contains.includes(type) : contains === type;
    }
}
