import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MediaWatcherDirectiveModule } from '@scaleo/core/media-watcher/directive';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { OffersLayoutComponent } from './offers-layout.component';

@NgModule({
    declarations: [OffersLayoutComponent],
    imports: [CommonModule, UiPageWrapperModule, RouterModule, MediaWatcherDirectiveModule]
})
export class OffersLayoutModule {}
