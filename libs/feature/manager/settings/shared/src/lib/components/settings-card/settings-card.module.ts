import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import { UiDividerModule } from '@scaleo/ui-kit/elements';

import { SettingsCardComponent } from './settings-card.component';
import { SettingsCardService } from './settings-card.service';

@NgModule({
    declarations: [SettingsCardComponent],
    providers: [SettingsCardService],
    imports: [CommonModule, UiCard2Module, UiDividerModule],
    exports: [SettingsCardComponent]
})
export class SettingsCardModule {}
