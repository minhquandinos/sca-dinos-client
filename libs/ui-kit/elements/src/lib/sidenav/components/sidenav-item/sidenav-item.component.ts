import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'scaleo-sidenav-item',
    template: ` <ng-content></ng-content> `,
    styleUrls: ['./sidenav-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavItemComponent {
    @HostBinding('class') hostClass = 'sidenav__item nav-item';
}
