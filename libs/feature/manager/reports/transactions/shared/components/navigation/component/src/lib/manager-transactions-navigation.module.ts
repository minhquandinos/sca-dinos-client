import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomInfoTooltipModule } from '@scaleo/shared/components';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { ManagerTransactionsNavigationComponent } from './manager-transactions-navigation/manager-transactions-navigation.component';

@NgModule({
    imports: [CommonModule, UiTabNavBarModule, SharedModule, RouterModule, CustomInfoTooltipModule],
    declarations: [ManagerTransactionsNavigationComponent]
})
export class ManagerTransactionsNavigationModule {}
