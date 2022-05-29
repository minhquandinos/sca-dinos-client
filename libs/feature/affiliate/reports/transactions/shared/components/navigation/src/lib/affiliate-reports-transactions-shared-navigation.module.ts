import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { AffiliateTransactionsNavigationComponent } from './affiliate-transactions-navigation.component';

@NgModule({
    declarations: [AffiliateTransactionsNavigationComponent],
    imports: [CommonModule, UiTabNavBarModule, SharedModule, RouterModule],
    exports: [AffiliateTransactionsNavigationComponent]
})
export class AffiliateReportsTransactionsSharedNavigationModule {}
