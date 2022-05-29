import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindDeviceModelsComponent } from './find-device-models.component';

@NgModule({
    declarations: [FindDeviceModelsComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindDeviceModelsComponent]
})
export class FindDeviceModelsModule {}
