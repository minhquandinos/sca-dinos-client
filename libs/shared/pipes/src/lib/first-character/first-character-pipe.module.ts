import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FirstCharacterPipe } from './first-character.pipe';

@NgModule({
    declarations: [FirstCharacterPipe],
    imports: [CommonModule],
    exports: [FirstCharacterPipe]
})
export class FirstCharacterPipeModule {}
