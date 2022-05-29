import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferRequestButtonComponent } from './components/offer-request-button.component';
import { ManagerOfferRequestSolveControlComponent } from './manager-offer-request-solve-control.component';

@NgModule({
    declarations: [ManagerOfferRequestSolveControlComponent, OfferRequestButtonComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule],
    exports: [ManagerOfferRequestSolveControlComponent]
})
export class ManagerOfferRequestSolveControlModule {}
