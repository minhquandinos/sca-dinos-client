import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { AdvertiserAccessStatisticsNavigationComponent } from './advertiser-access-statistics-navigation.component';

@NgModule({
    declarations: [AdvertiserAccessStatisticsNavigationComponent],
    imports: [CommonModule, SharedModule, RouterModule, UiTabNavBarModule],
    exports: [AdvertiserAccessStatisticsNavigationComponent]
})
export class AdvertiserAccessStatisticsNavigationModule {}
