import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomCheckboxModule, InputModule, RadioModule, TextareaModule, UpgradePlanInfoModule } from '@scaleo/shared/components';
import { FindRoleModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ConfigurationCheckboxComponent } from './configuration-upsert/components/configuration-checkbox.component';
import { ConfigurationGroupComponent } from './configuration-upsert/components/configuration-group.component';
import { ConfigurationItemsComponent } from './configuration-upsert/components/configuration-items.component';
import { ConfigurationRadioGroupComponent } from './configuration-upsert/components/configuration-radio-group.component';
import { ConfigurationUpsertComponent } from './configuration-upsert/configuration-upsert.component';
import { PermissionTranslatePipe } from './configuration-upsert/pipes/permission-translate.pipe';

@NgModule({
    imports: [
        CommonModule,
        Modal3EditFormModule,
        SharedModule,
        UiButtonLinkModule,
        InputModule,
        TextareaModule,
        RadioModule,
        CustomCheckboxModule,
        UpgradePlanInfoModule,
        UiLoaderModule,
        DisableButtonDuringRequestDirectiveModule,
        FindRoleModule
    ],
    declarations: [
        ConfigurationUpsertComponent,
        ConfigurationGroupComponent,
        ConfigurationItemsComponent,
        ConfigurationCheckboxComponent,
        ConfigurationRadioGroupComponent,
        PermissionTranslatePipe
    ]
})
export class ManagerSettingsPermissionConfigurationUpsertModalFormModule {}
