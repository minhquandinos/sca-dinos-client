import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShortAdvertiserDto } from '@scaleo/shared/data-access/short-entity-list';

@Component({
    selector: 'app-advertiser-chip',
    templateUrl: './advertiser-chip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserChipComponent {
    @Input() advertiser: ShortAdvertiserDto;

    @Input() showWithId = false;

    @Input() showCompanyName = false;
}
