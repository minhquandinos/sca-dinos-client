import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FlexLayoutCustomBreakpointsProvider } from './providers/flex-latout-custom-breakpoints.provider';

@NgModule({
    declarations: [],
    imports: [CommonModule, FlexLayoutModule.withConfig({ disableDefaultBps: true })],
    exports: [FlexLayoutModule],
    providers: [FlexLayoutCustomBreakpointsProvider]
})
export class UiCustomFlexLayoutModule {}
