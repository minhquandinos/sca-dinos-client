import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-advertiser-profile-quick-links',
    templateUrl: './advertiser-profile-quick-links.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserProfileQuickLinksComponent {
    @Input() id: number;
}
