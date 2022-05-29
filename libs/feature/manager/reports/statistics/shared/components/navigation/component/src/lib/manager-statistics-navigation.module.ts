import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomInfoTooltipModule } from '@scaleo/shared/components';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerStatisticsNavigationComponent } from './manager-statistics-navigation/manager-statistics-navigation.component';

@NgModule({
    imports: [CommonModule, UiTabNavBarModule, CustomInfoTooltipModule, RouterModule, SharedModule],
    declarations: [ManagerStatisticsNavigationComponent]
})
export class ManagerStatisticsNavigationModule {}
