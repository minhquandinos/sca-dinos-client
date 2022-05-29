import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LinkToItemModule } from '@scaleo/activity-log/shared/components/activity-link-to-item';
import { IsActivityObjectTypePipeModule } from '@scaleo/activity-log/shared/pipes/is-activity-object-type';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomReplacePipeModule } from '@scaleo/shared/pipes';

import { ActivityComponent } from './activity.component';
import { ManagerActivityComponent } from './components/manager-activity/manager-activity.component';
import { AffiliateActivityComponent } from './components/affiliate-activity/affiliate-activity.component';
import { AdvertiserActivityComponent } from './components/advertiser-activity/advertiser-activity.component';

@NgModule({
    declarations: [ActivityComponent, ManagerActivityComponent, AffiliateActivityComponent, AdvertiserActivityComponent],
    exports: [ActivityComponent],
    imports: [
        CommonModule,
        SharedModule,
        PlatformFormatPipeModule,
        CustomReplacePipeModule,
        LinkToItemModule,
        IsActivityObjectTypePipeModule
    ]
})
export class ActivityModule {}
