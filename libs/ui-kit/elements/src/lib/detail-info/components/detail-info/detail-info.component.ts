import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-detail-info',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoComponent {
    @HostBinding('class') hostClass = 'detail-info d-block container';
}
