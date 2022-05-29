import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferCustomParamsConditionsListItemModule } from '@scaleo/feature/manager/offer/custom-param/shared/components/condition-list-item';
import { OfferCustomParamsParametersListItemModule } from '@scaleo/feature/manager/offer/custom-param/shared/components/parameter-list-item';
import { OfferCustomParameterCreateModule } from '@scaleo/feature/manager/offer/custom-param/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CardWidgetModule, CustomPaginationModule, NavigateRootModule, ShortListColumnModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiButtonLinkModule, UiChipModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { CanUpdateCustomParamDirective } from './directives/can-update-custom-param.directive';
import { OfferCustomParamsWidgetComponent } from './offer-custom-params-widget.component';

@NgModule({
    declarations: [OfferCustomParamsWidgetComponent, CanUpdateCustomParamDirective],
    imports: [
        CommonModule,
        CardWidgetModule,
        SharedModule,
        UiButtonLinkModule,
        RouterModule,
        UiSimpleTableModule,
        TableNavigationModule,
        ShortListColumnModule,
        PlatformFormatPipeModule,
        NavigateRootModule,
        OfferCustomParameterCreateModule,
        OfferCustomParamsParametersListItemModule,
        OfferCustomParamsConditionsListItemModule,
        UiChipModule,
        CustomPaginationModule
    ],
    exports: [OfferCustomParamsWidgetComponent]
})
export class OfferCustomParamsWidgetModule {}
