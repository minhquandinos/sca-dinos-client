import { NgModule } from '@angular/core';

import { CustomFlexDirective } from './custom-flex.directive';

@NgModule({
    declarations: [CustomFlexDirective],
    exports: [CustomFlexDirective]
})
export class CustomFlexModule {}
