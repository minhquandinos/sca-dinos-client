import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import { UiDividerModule } from '@scaleo/ui-kit/elements';

import { AffiliateAccessApiComponent } from './affiliate-access-api.component';

@NgModule({
    imports: [CommonModule, UiCard2Module, SharedModule, FieldTextInfoModule, UiDividerModule],
    declarations: [AffiliateAccessApiComponent],
    exports: [AffiliateAccessApiComponent]
})
export class AffiliateToolsApiModule {}
