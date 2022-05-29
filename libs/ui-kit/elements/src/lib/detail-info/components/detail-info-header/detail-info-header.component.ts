import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-detail-info-header',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoHeaderComponent {
    @HostBinding('class') hostClass = 'detail-info-header d-flex align-items-center';
}
