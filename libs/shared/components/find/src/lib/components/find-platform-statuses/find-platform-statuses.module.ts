import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { StatusDotColorModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { FindPlatformStatusesComponent } from './find-platform-statuses.component';
import { FindPlatformStatusesTranslatePipe } from './pipes/find-platform-statuses-translate.pipe';

@NgModule({
    declarations: [FindPlatformStatusesComponent, FindPlatformStatusesTranslatePipe],
    imports: [CommonModule, SelectModule, SharedModule, StatusDotColorModule, UiChipModule],
    exports: [FindPlatformStatusesComponent]
})
export class FindPlatformStatusesModule {}
