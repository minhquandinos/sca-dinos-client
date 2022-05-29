import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiDropdownEntityModule } from '@scaleo/ui-kit/components/dropdown-entity';
import { DropdownMenuModule, UiDividerModule, UiImageModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { UserProfileComponent } from './user-profile.component';

@NgModule({
    declarations: [UserProfileComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiImageModule,
        DropdownMenuModule,
        UiSvgIconModule,
        RouterModule,
        UiDropdownEntityModule,
        UiDividerModule,
        TruncateTextPipeModule
    ],
    exports: [UserProfileComponent, UiDropdownEntityModule]
})
export class UserProfileModule {}
