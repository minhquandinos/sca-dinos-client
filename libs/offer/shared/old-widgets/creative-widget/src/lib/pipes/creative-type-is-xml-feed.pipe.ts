import { Pipe, PipeTransform } from '@angular/core';

import { CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'creativeTypeIsXmlFeed'
})
export class CreativeTypeIsXmlFeedPipe implements PipeTransform {
    transform(creativeType: CreativeTypesIdEnum): boolean {
        return creativeType === CreativeTypesIdEnum.XMLFeed;
    }
}
