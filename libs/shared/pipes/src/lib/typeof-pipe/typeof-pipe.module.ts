import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TypeofPipe } from './typeof.pipe';

@NgModule({
    declarations: [TypeofPipe],
    exports: [TypeofPipe],
    imports: [CommonModule]
})
export class TypeofPipeModule {}
