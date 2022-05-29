import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { ListNavBarModel } from './list-nav-bar.model';

@Component({
    selector: 'app-list-nav-bar',
    templateUrl: './list-nav-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListNavBarComponent {
    @Input() navigation: ListNavBarModel[] = [];

    @HostBinding('class') hostClass = 'd-flex w-100';

    trackByFn(index: number): number {
        return index;
    }
}
