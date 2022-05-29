import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Pipe({
    name: 'offerPromoteAllCategoriesTranslate'
})
export class OfferPromoteAllCategoriesTranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(value: string, id: number): Observable<string> {
        if (id === 0) {
            return this.translate.stream('dashboard_grid.widget.offer_promote.all_categories');
        }

        return of(value);
    }
}
