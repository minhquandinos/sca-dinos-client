import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { PathFileService } from '@scaleo/shared/services/path-file';

@Component({
    selector: 'app-country-flag',
    template: `
        <ui-image
            *ngIf="countryCodeImagePath"
            type="rounded"
            height="16"
            width="20"
            [ngClass]="className"
            [image]="countryCodeImagePath"
        ></ui-image>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryFlagComponent {
    @Input() set countryCode(countryCode: string) {
        if (countryCode) {
            this.countryCodeImagePath = this.pathFile.countryIcon(countryCode.toLowerCase());
        }
    }

    @Input() className: string;

    public countryCodeImagePath: string;

    @HostBinding('class') hostClass = 'd-flex align-items-center';

    constructor(private readonly pathFile: PathFileService) {}
}
