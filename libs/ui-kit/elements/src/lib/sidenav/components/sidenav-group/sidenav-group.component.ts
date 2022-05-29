import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'scaleo-sidenav-group',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./sidenav-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavGroupComponent {
    @HostBinding('class') hostClass = 'sidenav__group d-block';
}
