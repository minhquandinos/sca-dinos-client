import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FakeArrayPipe } from './fake-array.pipe';

@NgModule({
    declarations: [FakeArrayPipe],
    imports: [CommonModule],
    exports: [FakeArrayPipe]
})
export class UiFakeArrayPipeModule {}
