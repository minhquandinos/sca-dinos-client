import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { TopOfferListModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/list';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomDateRangeModule, FilledLineModule } from '@scaleo/shared/components';
import { ChangeColorOfNumberModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { TopOfferWidgetService } from './services/top-offer-widget.service';
import { TopOfferWidgetComponent } from './top-offer-widget.component';

@NgModule({
    declarations: [TopOfferWidgetComponent],
    imports: [
        CommonModule,
        ContainerWidgetModule,
        CustomDateRangeModule,
        UiSkeletonModule,
        UiTableModule,
        SharedModule,
        PlatformFormatPipeModule,
        UiButtonLinkModule,
        FilledLineModule,
        RouterModule,
        ChangeColorOfNumberModule,
        TopOfferListModule
    ],
    exports: [TopOfferWidgetComponent],
    providers: [TopOfferWidgetService]
})
export class TopOfferWidgetModule {}
