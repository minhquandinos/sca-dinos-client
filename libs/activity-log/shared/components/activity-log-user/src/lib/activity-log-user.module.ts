import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiChipModule, UiImageModule } from '@scaleo/ui-kit/elements';

import { ActivityLogUserComponent } from './activity-log-user.component';

@NgModule({
    declarations: [ActivityLogUserComponent],
    exports: [ActivityLogUserComponent],
    imports: [CommonModule, UiChipModule, UiImageModule, SharedModule]
})
export class ActivityLogUserModule {}
