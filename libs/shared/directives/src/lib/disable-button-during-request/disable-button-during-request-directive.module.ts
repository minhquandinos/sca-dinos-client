import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DisableButtonDuringRequestDirective } from './disable-button-during-request.directive';

@NgModule({
    declarations: [DisableButtonDuringRequestDirective],
    imports: [CommonModule],
    exports: [DisableButtonDuringRequestDirective]
})
export class DisableButtonDuringRequestDirectiveModule {}
