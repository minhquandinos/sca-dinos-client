import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GeoPipe } from './geo.pipe';

@NgModule({
    declarations: [GeoPipe],
    imports: [CommonModule],
    exports: [GeoPipe]
})
export class GeoPipeModule {}
