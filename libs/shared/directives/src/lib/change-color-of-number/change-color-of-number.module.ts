import { NgModule } from '@angular/core';

import { ChangeColorOfNumberDirective } from './change-color-of-number.directive';

@NgModule({
    declarations: [ChangeColorOfNumberDirective],
    exports: [ChangeColorOfNumberDirective]
})
export class ChangeColorOfNumberModule {}
