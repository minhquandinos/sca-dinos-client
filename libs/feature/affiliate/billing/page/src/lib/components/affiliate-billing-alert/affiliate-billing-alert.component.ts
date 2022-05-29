import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'scaleo-affiliate-billing-alert',
    templateUrl: './affiliate-billing-alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateBillingAlertComponent {
    @Input() paymentInfo: string;

    @Output() toogle: EventEmitter<any> = new EventEmitter<any>();

    close() {
        this.toogle.emit();
    }
}
