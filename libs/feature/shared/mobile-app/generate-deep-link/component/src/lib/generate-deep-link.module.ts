import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { MediaWatcherDirectiveModule } from '@scaleo/core/media-watcher/directive';
import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ApplicationStoreComponent } from './components/application-store.component';
import { GenerateDeepLinkComponent } from './generate-deep-link.component';
import { AvailableOsIconPipe } from './pipes/available-os-icon.pipe';

@NgModule({
    declarations: [GenerateDeepLinkComponent, ApplicationStoreComponent, AvailableOsIconPipe],
    imports: [CommonModule, QRCodeModule, UiSvgIconModule, MediaWatcherDirectiveModule, SharedModule],
    exports: [GenerateDeepLinkComponent]
})
export class GenerateDeepLinkModule {}
