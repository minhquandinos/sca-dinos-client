import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'scaleo-affiliate-mobile-app',
    template: `
        <scaleo-card2 size="half">
            <scaleo-card2-title>
                <span class="title">{{ 'mobile_app.title' | translate }}</span>
            </scaleo-card2-title>

            <ui-divider></ui-divider>

            <scaleo-card2-content>
                <scaleo-feature-shared-generate-deep-link></scaleo-feature-shared-generate-deep-link>
            </scaleo-card2-content>
        </scaleo-card2>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileAppViewDeepLinkComponent {}
