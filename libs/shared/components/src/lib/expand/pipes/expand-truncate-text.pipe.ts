import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TruncateTextPipe } from '@scaleo/shared/pipes';

import { ExpandService } from '../services/expand.service';

@Pipe({
    name: 'expandTruncateText'
})
export class ExpandTruncateTextPipe implements PipeTransform {
    constructor(private readonly expandService: ExpandService, private readonly truncateText: TruncateTextPipe) {}

    transform(value: string, limit: number): Observable<string> {
        // const clearHtml = value.replace(/<.*?>/g, ' ');
        this.expandService.setTextLength(value);
        this.expandService.setLimit(limit);
        return this.expandService.opened$.pipe(map((opened) => (opened ? value : this.truncateText.transform(value, limit))));
    }
}
