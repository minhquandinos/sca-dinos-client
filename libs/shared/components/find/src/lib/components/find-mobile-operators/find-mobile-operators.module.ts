import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindMobileOperatorsComponent } from './find-mobile-operators.component';

@NgModule({
    declarations: [FindMobileOperatorsComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindMobileOperatorsComponent]
})
export class FindMobileOperatorsModule {}
