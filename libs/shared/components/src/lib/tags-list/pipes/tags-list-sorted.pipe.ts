import { Pipe, PipeTransform } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';

@Pipe({
    name: 'tagsListSorted'
})
export class TagsListSortedPipe implements PipeTransform {
    transform(tags: ShortResponseInterface[]): ShortResponseInterface[] {
        return [...tags].sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    }
}
