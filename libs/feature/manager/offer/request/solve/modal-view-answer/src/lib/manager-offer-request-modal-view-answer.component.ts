import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, TemplateRef, ViewChild } from '@angular/core';

import { OfferRequestType } from '@scaleo/feature/manager/offer/request/solve/data-access';
import { BaseOfferRequestModalViewAnswerComponent } from '@scaleo/offer/request/view-answer/common';
import { OfferRequestModalViewAnswerComponent } from '@scaleo/offer/request/view-answer/modal-info';
import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'scaleo-manager-offer-request-modal-view-answer',
    templateUrl: './manager-offer-request-modal-view-answer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerOfferRequestModalViewAnswerComponent extends BaseOfferRequestModalViewAnswerComponent {
    @Output() solved: EventEmitter<OfferRequestType> = new EventEmitter<OfferRequestType>();

    @ViewChild(OfferRequestModalViewAnswerComponent)
    private readonly offerRequestModalViewAnswerRef: OfferRequestModalViewAnswerComponent;

    @ViewChild('controlTpl')
    private set controlTpl(tpl: TemplateRef<any>) {
        if (!this.control) {
            const showFooterControl =
                this.status === OfferRequestStatusEnum.Pending &&
                this.checkPermissionService.check(this.permissions.canManageOfferRequests);
            this.control = showFooterControl ? tpl : undefined;
        }
    }

    control: TemplateRef<any> = undefined;

    constructor(
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super();
    }

    action(status: OfferRequestType): void {
        this.offerRequestModalViewAnswerRef.modalRef.close(null);
        this.solved.emit(status);
    }
}
