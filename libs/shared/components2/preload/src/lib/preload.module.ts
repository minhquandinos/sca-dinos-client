import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSpinnerModule } from '@scaleo/ui-kit/elements';

import { PreloadComponent } from './preload.component';

const publicEntities = [PreloadComponent];

@NgModule({
    declarations: [...publicEntities],
    imports: [CommonModule, UiSpinnerModule, SharedModule],
    exports: [...publicEntities]
})
export class PreloadModule {}
