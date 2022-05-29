import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Pipe({
    name: 'customFieldCheckboxValue'
})
export class CustomFieldCheckboxValuePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(value: string): Observable<string> {
        const translate = value ? 'yes' : 'no';

        return this.translate.stream(`interface.basic.${translate}`);
    }
}
