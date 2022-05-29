import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindPlatformListComponent } from './find-platform-list.component';
import { FindPlatformListTranslatePipe } from './pipes/find-platform-list-translate.pipe';

@NgModule({
    declarations: [FindPlatformListComponent, FindPlatformListTranslatePipe],
    imports: [CommonModule, SelectModule, SharedModule],
    exports: [FindPlatformListComponent]
})
export class FindPlatformListModule {}
