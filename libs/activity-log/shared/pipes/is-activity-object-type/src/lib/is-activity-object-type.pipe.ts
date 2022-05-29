import { Pipe, PipeTransform } from '@angular/core';

import { ActivityLogInterface } from '../../../../../common/src/lib/activity-log.interface';
import { ActivityObjectTypeEnum } from '../../../../../common/src/lib/enums/activity-log.enum';

@Pipe({
    name: 'isActivityObjectType'
})
export class IsActivityObjectTypePipe implements PipeTransform {
    transform(item: ActivityLogInterface, contains: ActivityObjectTypeEnum | ActivityObjectTypeEnum[]): boolean {
        const objectType = item.activity.object_type;
        return Array.isArray(contains) ? contains.includes(objectType) : contains === objectType;
    }
}
