import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomDateRangeModule, InputModule, TextareaModule } from '@scaleo/shared/components';
import { FindGoalsModule, FindOfferModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AddConditionsComponent } from './add-conditions.component';

@NgModule({
    declarations: [AddConditionsComponent],
    exports: [AddConditionsComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiSvgIconModule,
        UiButtonLinkModule,
        SelectModule,
        InputModule,
        CustomDateRangeModule,
        FindOfferModule,
        TextareaModule,
        DragDropModule,
        FindGoalsModule,
        FindPlatformStatusesModule,
        CustomTranslatePipeModule
    ]
})
export class AddConditionsModule {}
