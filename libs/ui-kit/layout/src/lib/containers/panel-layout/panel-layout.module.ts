import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { PanelLayoutService } from '../../services/panel-layout.service';
import { PanelLayoutComponent } from './panel-layout.component';

@NgModule({
    declarations: [PanelLayoutComponent],
    imports: [CommonModule, RouterModule, UiSvgIconModule],
    exports: [PanelLayoutComponent],
    providers: [PanelLayoutService]
})
export class PanelLayoutModule {}
