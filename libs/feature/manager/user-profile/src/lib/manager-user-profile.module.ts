import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { LanguageSwitcherModule } from '@scaleo/shared/components';
import { UserProfileModule } from '@scaleo/shared/layout/components';
import { UiDividerModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ManagerUserProfileComponent } from './manager-user-profile/manager-user-profile.component';
import { ManagerUserProfileEditFormModule } from './manager-user-profile-edit-form/manager-user-profile-edit-form.module';

@NgModule({
    imports: [
        CommonModule,
        UserProfileModule,
        SharedModule,
        UiDividerModule,
        UiSvgIconModule,
        RouterModule,
        LanguageSwitcherModule,
        ManagerUserProfileEditFormModule
    ],
    declarations: [ManagerUserProfileComponent]
})
export class ManagerUserProfileModule {}
