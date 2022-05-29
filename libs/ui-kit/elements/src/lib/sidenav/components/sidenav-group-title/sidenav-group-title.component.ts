import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'scaleo-sidenav-group-title',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./sidenav-group-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavGroupTitleComponent {
    @HostBinding('class') hostClass = 'sidenav__group-title';
}
