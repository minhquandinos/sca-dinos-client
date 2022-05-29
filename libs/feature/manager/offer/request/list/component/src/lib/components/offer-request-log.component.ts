import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { OfferRequestActionModel } from '@scaleo/feature/manager/offer/request/list/data-access';
import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-offer-request-log',
    template: `
        <div class="d-flex align-items-center">
            <span class="text-nowrap m-r-6">{{ actionName | translate }}</span>
            <app-manager-chip
                [image]="data?.image | defaultImage: 'manager'"
                [name]="data?.firstname + ' ' + data?.lastname"
            ></app-manager-chip>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferRequestLogComponent {
    @HostBinding('class') hostClass = '';

    @Input() data: OfferRequestActionModel;

    @Input() set status(status: OfferRequestStatusEnum) {
        if (status) {
            const actionMap: BaseObjectModel = {
                [OfferRequestStatusEnum.Approved]: 'approved_by',
                [OfferRequestStatusEnum.Rejected]: 'rejected_by'
            };

            if (actionMap?.[status]) {
                this.actionName = `interface.basic.${actionMap?.[status]}`;
            }
        }
    }

    actionName: string;
}
