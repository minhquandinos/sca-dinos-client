import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Pipe({
    name: 'postbackLevelName'
})
export class PostbackLevelNamePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(value: string): Observable<string> {
        return this.translate.stream(`affiliate.postback.${value.toLowerCase()}`);
    }
}
