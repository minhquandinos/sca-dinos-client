import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';

import { PerformanceMetricColorDirective } from './performance-metric-color.directive';
import { PerformanceMetricListComponent } from './performance-metric-list.component';

@NgModule({
    declarations: [PerformanceMetricListComponent, PerformanceMetricColorDirective],
    imports: [CommonModule, NgSelectModule, SharedModule, CustomTranslatePipeModule],
    exports: [PerformanceMetricListComponent]
})
export class PerformanceMetricListModule {}
