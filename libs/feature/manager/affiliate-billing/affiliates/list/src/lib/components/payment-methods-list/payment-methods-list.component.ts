import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

import { PaymentMethodModel } from '../../../../../data-access/src/lib/models/billing-affiliates.model';

@Component({
    selector: 'app-payment-methods-list',
    templateUrl: './payment-methods-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodsListComponent implements OnChanges {
    @HostBinding('class') hostClass = 'd-flex flex-column';

    @Input() methods: PaymentMethodModel[];

    endIndexForSLicePipe: number;

    ngOnChanges(changes: SimpleChanges) {
        const methodsChanges: SimpleChange = changes.methods;
        const methods: PaymentMethodModel[] = methodsChanges?.currentValue;
        if (methods) {
            this.endIndexForSLicePipe = methods.length > 3 ? 2 : 3;
        }
    }
}
