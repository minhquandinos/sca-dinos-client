import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { AffiliateAccessStatisticsNavigationComponent } from './affiliate-access-statistics-navigation.component';

@NgModule({
    declarations: [AffiliateAccessStatisticsNavigationComponent],
    imports: [CommonModule, UiTabNavBarModule, SharedModule, RouterModule],
    exports: [AffiliateAccessStatisticsNavigationComponent]
})
export class AffiliateAccessReportsStatisticsNavigationModule {}
