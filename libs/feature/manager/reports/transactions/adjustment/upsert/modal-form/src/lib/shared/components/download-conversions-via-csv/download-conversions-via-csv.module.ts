import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomFileUploadModule } from '@scaleo/shared/components';

import { DownloadConversionsViaCsvComponent } from './download-conversions-via-csv.component';

@NgModule({
    declarations: [DownloadConversionsViaCsvComponent],
    imports: [CommonModule, SharedModule, CustomFileUploadModule],
    exports: [DownloadConversionsViaCsvComponent]
})
export class DownloadConversionsViaCsvModule {}
