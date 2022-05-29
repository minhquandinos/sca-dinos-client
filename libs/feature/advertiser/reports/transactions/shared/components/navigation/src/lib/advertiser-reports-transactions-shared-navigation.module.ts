import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { AdvertiserTransactionsNavigationComponent } from './advertiser-transactions-navigation.component';

@NgModule({
    declarations: [AdvertiserTransactionsNavigationComponent],
    imports: [CommonModule, SharedModule, UiTabNavBarModule, RouterModule],
    exports: [AdvertiserTransactionsNavigationComponent]
})
export class AdvertiserReportsTransactionsSharedNavigationModule {}
