import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';
import { ShortEntityListModule } from '@scaleo/shared/data-access/short-entity-list';

import { FindAdvertisersComponent } from './find-advertisers.component';

@NgModule({
    declarations: [FindAdvertisersComponent],
    exports: [FindAdvertisersComponent],
    imports: [CommonModule, SharedModule, SelectModule, ShortEntityListModule]
})
export class FindAdvertisersModule {}
