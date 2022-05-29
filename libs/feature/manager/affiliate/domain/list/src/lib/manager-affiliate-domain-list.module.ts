import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateDomainUpsertModule } from '@scaleo/feature/manager/affiliate/domain/upsert';
import { CustomPaginationModule, FiltersModule, StatusDotColorModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { TableNavigationModule, UiButtonLinkModule, UiPageWrapperModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { AffiliateDomainComponent } from './affiliate-domain.component';

@NgModule({
    declarations: [AffiliateDomainComponent],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        FiltersModule,
        UiTable2Module,
        CustomPaginationModule,
        FindPlatformStatusesModule,
        SharedModule,
        StatusDotColorModule,
        TableNavigationModule,
        ManagerAffiliateDomainUpsertModule
    ],
    exports: [AffiliateDomainComponent]
})
export class ManagerAffiliateDomainListModule {}
