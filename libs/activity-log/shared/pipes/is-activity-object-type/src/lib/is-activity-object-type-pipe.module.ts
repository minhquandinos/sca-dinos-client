import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsActivityObjectTypePipe } from './is-activity-object-type.pipe';

@NgModule({
    declarations: [IsActivityObjectTypePipe],
    imports: [CommonModule],
    exports: [IsActivityObjectTypePipe]
})
export class IsActivityObjectTypePipeModule {}
