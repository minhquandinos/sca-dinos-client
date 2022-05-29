import { Pipe, PipeTransform } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';

@Pipe({
    name: 'tagsListTake'
})
export class TagsListTakePipe implements PipeTransform {
    transform(tags: ShortResponseInterface[], showAll: boolean): ShortResponseInterface[] {
        return showAll ? tags : tags.filter((tag, index) => index <= 5);
    }
}
