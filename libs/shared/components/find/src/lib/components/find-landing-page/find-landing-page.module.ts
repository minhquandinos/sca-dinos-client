import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindLandingPageComponent } from './find-landing-page.component';

@NgModule({
    declarations: [FindLandingPageComponent],
    imports: [CommonModule, SelectModule, PlatformFormatPipeModule, SharedModule],
    exports: [FindLandingPageComponent]
})
export class FindLandingPageModule {}
