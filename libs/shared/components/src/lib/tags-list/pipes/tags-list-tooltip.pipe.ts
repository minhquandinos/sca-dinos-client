import { Pipe, PipeTransform } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';

@Pipe({
    name: 'tagsListTooltip'
})
export class TagsListTooltipPipe implements PipeTransform {
    transform(tags: ShortResponseInterface[]): string {
        return tags.map((tag) => tag.title).join(', ');
    }
}
