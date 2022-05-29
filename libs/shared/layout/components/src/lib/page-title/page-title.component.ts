import { ChangeDetectionStrategy, Component } from '@angular/core';
import { debounceTime, map, shareReplay } from 'rxjs/operators';

import { PageTitleService } from '@scaleo/shared/services/page-title';

@Component({
    selector: 'shared-layout-page-title',
    templateUrl: './page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
    private readonly _title$ = this.titleService.title$.pipe(debounceTime(0), shareReplay());

    readonly breadcrumbs$ = this._title$.pipe(
        debounceTime(0),
        map((values) => values.filter((crumb) => !crumb.current))
    );

    readonly showBreadcrumbs$ = this.breadcrumbs$.pipe(map((breadcrumbs) => !!breadcrumbs.length));

    readonly headerTranslateKey$ = this._title$.pipe(map((values) => values.find((crumb) => crumb?.current)?.key));

    readonly headerTitle$ = this._title$.pipe(map((values) => values.find((crumb) => crumb?.current)?.title));

    constructor(private titleService: PageTitleService) {}
}
