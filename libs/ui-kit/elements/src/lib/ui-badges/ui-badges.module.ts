import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiBadgesComponent } from './ui-badges.component';

@NgModule({
    declarations: [UiBadgesComponent],
    exports: [UiBadgesComponent],
    imports: [CommonModule]
})
export class UiBadgesModule {}
