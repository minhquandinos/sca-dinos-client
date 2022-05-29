import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ServiceLocator } from '@scaleo/core/locator/service';

@Component({
    template: ''
})
export abstract class BaseListUpsertComponent {
    editId: number;

    abstract title$: Observable<string>;

    abstract buttonLabel$: Observable<string>;

    private readonly _translateService: TranslateService;

    protected constructor() {
        this._translateService = ServiceLocator.injector.get(TranslateService);
    }

    protected abstract getTitle(type: 'create' | 'update'): Observable<string>;

    protected getButtonLabel(type: 'create' | 'update'): Observable<string> {
        const translate = 'shared.dictionary';
        const map = {
            create: `${translate}.add`,
            update: `${translate}.update`
        };
        return this._translateService.stream(map[type] || map.create);
    }
}
