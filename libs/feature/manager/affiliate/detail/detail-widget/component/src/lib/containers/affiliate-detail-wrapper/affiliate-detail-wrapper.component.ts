import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-affiliate-detail-wrapper',
    template: `
        <div class="page-block">
            <app-affiliate-detail></app-affiliate-detail>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateDetailWrapperComponent {}
