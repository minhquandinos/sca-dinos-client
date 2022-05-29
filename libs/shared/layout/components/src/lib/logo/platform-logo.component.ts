import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';

import { BrandingService } from '@scaleo/platform/branding';

@Component({
    selector: 'app-platform-logo',
    template: `
        <div
            class="platform-logo menu-header__logo align-self-center"
            [ngClass]="{ 'platform-logo--default menu-header__logo-default': defaultLogo$ | async }"
            [routerLink]="'/dashboard' | navigateRoot"
            [ngStyle]="logoStyle$ | async"
        ></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformLogoComponent {
    @HostBinding('class')
    hostClass = 'd-contents';

    logoStyle$ = this.brandingService.logoStyle$;

    defaultLogo$ = this.brandingService.logoStyle$.pipe(map((logo) => !logo));

    constructor(private brandingService: BrandingService) {}
}
