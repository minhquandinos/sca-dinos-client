import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerOfferRequestSolveControlModule } from '@scaleo/feature/manager/offer/request/solve/control';
import { OfferRequestModalViewAnswerModule } from '@scaleo/offer/request/view-answer/modal-info';

import { ManagerOfferRequestModalViewAnswerComponent } from './manager-offer-request-modal-view-answer.component';

@NgModule({
    imports: [CommonModule, OfferRequestModalViewAnswerModule, ManagerOfferRequestSolveControlModule],
    declarations: [ManagerOfferRequestModalViewAnswerComponent],
    exports: [ManagerOfferRequestModalViewAnswerComponent]
})
export class ManagerOfferRequestSolveModalViewAnswerModule {}
