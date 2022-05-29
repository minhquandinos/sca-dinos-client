import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-detail-info-col',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoColComponent {
    @HostBinding('class') hostClass = 'detail-info-col col';
}
