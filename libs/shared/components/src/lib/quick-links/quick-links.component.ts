import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-quick-links',
    templateUrl: './quick-links.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickLinksComponent {
    @HostBinding('class') hostClass = 'quick-links';
}
