import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomSwitchModule, InputModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiBrModule } from '@scaleo/ui-kit/elements';

import { AffiliateGeneralComponent } from './affiliate-general.component';

const publicModule: Type<any>[] = [AffiliateGeneralComponent];

@NgModule({
    imports: [CommonModule, SharedModule, CustomSwitchModule, SelectModule, FindPlatformListModule, InputModule, UiBrModule],
    declarations: [...publicModule],
    exports: [...publicModule]
})
export class ManagerSettingsAffiliatesGeneralModule {}
