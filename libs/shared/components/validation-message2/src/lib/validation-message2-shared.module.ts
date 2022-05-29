import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ValidationMessage2Component } from './validation-message2.component';

@NgModule({
    declarations: [ValidationMessage2Component],
    exports: [ValidationMessage2Component],
    imports: [CommonModule, TranslateModule]
})
export class ValidationMessage2SharedModule {}
