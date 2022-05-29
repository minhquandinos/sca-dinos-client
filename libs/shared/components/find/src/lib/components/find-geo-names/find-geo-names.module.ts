import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindGeoNamesComponent } from './find-geo-names.component';

@NgModule({
    declarations: [FindGeoNamesComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindGeoNamesComponent]
})
export class FindGeoNamesModule {}
