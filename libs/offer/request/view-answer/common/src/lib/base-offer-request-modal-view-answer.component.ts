import { Component, Input } from '@angular/core';

import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';

@Component({
    template: ``
})
export abstract class BaseOfferRequestModalViewAnswerComponent {
    @Input() id: number;

    @Input() status: OfferRequestStatusEnum;

    @Input() questions: string;

    @Input() answer: string;
}
