import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { DashboardSkeletonComponent } from './dashboard-skeleton/dashboard-skeleton.component';

@NgModule({
    imports: [CommonModule, UiSkeletonModule],
    declarations: [DashboardSkeletonComponent],
    exports: [DashboardSkeletonComponent]
})
export class DashboardSkeletonModule {}
