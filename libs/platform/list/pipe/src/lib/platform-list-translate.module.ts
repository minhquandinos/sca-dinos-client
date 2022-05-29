import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformListTranslatePipe } from './platform-list-translate.pipe';

@NgModule({
    declarations: [PlatformListTranslatePipe],
    imports: [CommonModule],
    exports: [PlatformListTranslatePipe]
})
export class PlatformListTranslateModule {}
