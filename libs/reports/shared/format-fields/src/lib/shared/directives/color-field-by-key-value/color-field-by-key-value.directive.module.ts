import { NgModule } from '@angular/core';

import { ColorFieldByKeyValueDirective } from './color-field-by-key-value.directive';

@NgModule({
    declarations: [ColorFieldByKeyValueDirective],
    exports: [ColorFieldByKeyValueDirective]
})
export class ColorFieldByKeyValueDirectiveModule {}
