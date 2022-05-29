import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-detail-info-row',
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoRowComponent {
    @HostBinding('class') hostClass = 'detail-info-row row';
}
