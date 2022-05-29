import { Component, EventEmitter, HostBinding, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { MANAGER_DUPLICATE_OFFER_PROVIDER, ManagerDuplicateOfferService } from '@scaleo/feature/manager/offer/duplicate/data-access';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-offer-duplicate',
    templateUrl: './manager-offer-duplicate.component.html',
    providers: [MANAGER_DUPLICATE_OFFER_PROVIDER]
})
export class ManagerOfferDuplicateComponent {
    @ViewChild('duplicateConfirm') private readonly duplicateConfirmTmp: TemplateRef<HTMLElement>;

    @HostBinding('class') hostClass = 'h-fit-content d-flex align-items-center';

    @Output() duplicated: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private modal3Service: Modal3Service,
        private translate: TranslateService,
        private readonly managerDuplicateOfferService: ManagerDuplicateOfferService,
        private toastr: ToastrBarService
    ) {}

    public duplicate(offerId: number) {
        const modal$ = this.modal3Service.confirm(this.duplicateConfirmTmp, {
            title: this.translate.instant('offers_page.duplicate.title'),
            actionLabel: this.translate.instant('interface.basic.continue'),
            typeButton: 'main'
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.managerDuplicateOfferService.duplicate(offerId) as Observable<number>),
                filter((res: number) => !!res),
                take(1)
            )
            .subscribe((id) => {
                this.duplicated.emit(id);
                this.toastr.successes(this.translate.instant('offers_page.duplicate.res_successfully_message'));
            });
    }
}
