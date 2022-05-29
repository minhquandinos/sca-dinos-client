import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { TopAffiliatesModule } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/list';

import { TopAffiliateWidgetComponent } from './top-affiliate-widget.component';

@NgModule({
    declarations: [TopAffiliateWidgetComponent],
    imports: [CommonModule, ContainerWidgetModule, TopAffiliatesModule, SharedModule],
    exports: [TopAffiliateWidgetComponent]
})
export class TopAffiliateWidgetModule {}
