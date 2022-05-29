import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { LanguageSwitcherModule } from '@scaleo/shared/components';
import { UserProfileModule } from '@scaleo/shared/layout/components';
import { UiDividerModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AdvertiserUserProfileEditFormModule } from '../advertiser-user-profile-edit-form/advertiser-user-profile-edit-form.module';
import { AdvertiserUserProfileComponent } from './advertiser-user-profile.component';

@NgModule({
    declarations: [AdvertiserUserProfileComponent],
    imports: [
        CommonModule,
        AdvertiserUserProfileEditFormModule,
        UiSvgIconModule,
        UserProfileModule,
        SharedModule,
        LanguageSwitcherModule,
        UiDividerModule
    ]
})
export class AdvertiserUserProfileModule {}
