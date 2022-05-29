import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-payment-method-detail',
    template: `
        <div class="d-flex align-items-center">
            <div class="mr-1 d-flex align-items-center" [tooltip]="tooltipText" [display]="!!tooltipText">
                <ui-image type="rounded" [image]="logo | defaultImage: 'payment'" [width]="logoWidth"></ui-image>
            </div>

            <span class="affiliate-billing-details__payment-info">{{ method | truncateText: methodLimitText }}</span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodDetailComponent {
    @Input() tooltipText: string;

    @Input() logo: string;

    @Input() method: string;

    @Input() logoWidth = 32;

    @Input() methodLimitText = 25;
}
