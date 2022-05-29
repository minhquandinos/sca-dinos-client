import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindDeviceBrandsComponent } from './find-device-brands.component';

@NgModule({
    declarations: [FindDeviceBrandsComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindDeviceBrandsComponent]
})
export class FindDeviceBrandsModule {}
