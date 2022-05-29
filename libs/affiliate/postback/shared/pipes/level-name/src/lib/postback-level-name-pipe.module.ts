import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostbackLevelNamePipe } from './postback-level-name.pipe';

@NgModule({
    declarations: [PostbackLevelNamePipe],
    imports: [CommonModule],
    exports: [PostbackLevelNamePipe]
})
export class PostbackLevelNamePipeModule {}
