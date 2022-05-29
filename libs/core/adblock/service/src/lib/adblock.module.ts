import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ADBLOCK_PROVIDER } from './adblock.service.provider';

@NgModule({
    imports: [CommonModule],
    providers: [ADBLOCK_PROVIDER]
})
export class AdblockModule {}
