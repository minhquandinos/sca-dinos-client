import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { AdblockInfoBarComponent } from './adblock-info-bar/adblock-info-bar.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [AdblockInfoBarComponent]
})
export class AdblockInfoBarModule {}
