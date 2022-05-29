import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BooleanEnum } from '@scaleo/core/data';

@Component({
    selector: 'app-available-smart-link',
    templateUrl: './available-smart-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailableSmartLinkComponent {
    @Input() availableForAffiliate: BooleanEnum;

    public readonly booleanEnum = BooleanEnum;
}
