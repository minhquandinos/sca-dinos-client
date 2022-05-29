import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UserProfileModule } from '@scaleo/shared/layout/components';
import { UiDividerModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateUserProfileComponent } from './affiliate-user-profile/affiliate-user-profile.component';
import { AffiliateUserProfileEditFormModule } from './affiliate-user-profile-edit-form/affiliate-user-profile-edit-form.module';

@NgModule({
    imports: [
        CommonModule,
        UserProfileModule,
        SharedModule,
        UiDividerModule,
        UiSvgIconModule,
        RouterModule,
        AffiliateUserProfileEditFormModule
    ],
    declarations: [AffiliateUserProfileComponent]
})
export class AffiliateUserProfileModule {}
