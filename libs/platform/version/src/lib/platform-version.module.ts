import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject, NgModule } from '@angular/core';

import { PLATFORM_ENVIRONMENT_TOKEN, PlatformEnvironmentModel } from '@scaleo/platform/environment';

@NgModule({
    imports: [CommonModule]
})
export class PlatformVersionModule {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(PLATFORM_ENVIRONMENT_TOKEN) private readonly env: PlatformEnvironmentModel
    ) {
        this.buildVersion();
    }

    private buildVersion(): void {
        const mainColor = getComputedStyle(this.document.querySelector('html')).getPropertyValue('--main-bg-color');
        console.log(`%cBuild version: ${this.env.buildVersion}`, `color: ${mainColor}; font-size: 1rem`);
    }
}
