import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseOfferRequestModalViewAnswerComponent } from '@scaleo/offer/request/view-answer/common';
import { Modal3Ref, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-offer-request-modal-qa',
    templateUrl: './offer-request-modal-view-answer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferRequestModalViewAnswerComponent extends BaseOfferRequestModalViewAnswerComponent {
    @Input()
    footerControls: TemplateRef<any> = undefined;

    @ViewChild('viewFullQuestionTpl')
    private readonly viewFullQuestionTpl: TemplateRef<any>;

    modalRef: Modal3Ref;

    constructor(private readonly translate: TranslateService, private readonly modal3: Modal3Service) {
        super();
    }

    viewQA(): void {
        this.modalRef = this.modal3.info(this.viewFullQuestionTpl, {
            title: this.translate.instant('offers_requests_page.approval_questions'),
            footer: {
                template: this.footerControls,
                borderTop: true
            }
        });
    }
}
