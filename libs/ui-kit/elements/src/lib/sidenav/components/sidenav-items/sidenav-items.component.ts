import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'scaleo-sidenav-items',
    templateUrl: './sidenav-items.component.html',
    styleUrls: ['./sidenav-items.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavItemsComponent {
    trackByFn(index: number): number {
        return index;
    }
}
