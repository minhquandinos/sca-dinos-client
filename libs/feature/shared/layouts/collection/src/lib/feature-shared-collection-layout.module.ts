import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MediaWatcherDirectiveModule } from '@scaleo/core/media-watcher/directive';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { FeatureSharedCollectionLayoutComponent } from './feature-shared-collection-layout.component';

@NgModule({
    declarations: [FeatureSharedCollectionLayoutComponent],
    imports: [CommonModule, PortalModule, UiPageWrapperModule, RouterModule, MediaWatcherDirectiveModule],
    exports: [FeatureSharedCollectionLayoutComponent]
})
export class FeatureSharedCollectionLayoutModule {}
