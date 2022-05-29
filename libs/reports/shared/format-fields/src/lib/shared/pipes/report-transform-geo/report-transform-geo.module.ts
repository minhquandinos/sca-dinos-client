import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportTransformGeoPipe } from './report-transform-geo.pipe';

@NgModule({
    declarations: [ReportTransformGeoPipe],
    imports: [CommonModule],
    exports: [ReportTransformGeoPipe]
})
export class ReportTransformGeoModule {}
