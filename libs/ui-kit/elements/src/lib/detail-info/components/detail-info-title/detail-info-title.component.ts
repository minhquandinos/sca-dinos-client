import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-detail-info-title',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoTitleComponent {
    @HostBinding('class') hostClass = 'detail-info-title d-block title is-6 line-height is-17';
}
