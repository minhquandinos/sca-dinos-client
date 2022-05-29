import { NgModule } from '@angular/core';

import { StringLengthDirective } from './string-length.directive';

@NgModule({
    declarations: [StringLengthDirective],
    exports: [StringLengthDirective]
})
export class StringLengthModule {}
