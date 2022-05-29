import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';
// import { DefaultImageModule } from '@scaleo/shared/pipes';
import { UiChipModule, UiImageModule } from '@scaleo/ui-kit/elements';

import { FindManagersComponent } from './find-managers.component';

@NgModule({
    declarations: [FindManagersComponent],
    imports: [CommonModule, SelectModule, SharedModule, UiChipModule, UiImageModule],
    exports: [FindManagersComponent]
})
export class FindManagersModule {}
