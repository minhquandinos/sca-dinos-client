import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatusColor2Directive } from './directives/status-color.directive';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { StatusLabelPipe } from './pipes/status-label.pipe';
import { StatusTranslatePipe } from './pipes/status-translate.pipe';

@NgModule({
    declarations: [StatusColor2Directive, StatusLabelPipe, StatusColorPipe, StatusTranslatePipe],
    imports: [CommonModule],
    exports: [StatusColor2Directive, StatusLabelPipe, StatusColorPipe, StatusTranslatePipe]
})
export class PlatformStatusesModule {}
