import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { GenerateDeepLinkModule } from '@scaleo/feature/shared/mobile-app/generate-deep-link/component';
import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import { UiDividerModule } from '@scaleo/ui-kit/elements';

import { MobileAppViewDeepLinkComponent } from './mobile-app-view-deep-link.component';

@NgModule({
    imports: [CommonModule, UiCard2Module, GenerateDeepLinkModule, SharedModule, UiDividerModule],
    declarations: [MobileAppViewDeepLinkComponent]
})
export class MobileAppViewDeepLinkModule {}
