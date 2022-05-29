import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailInfoComponent } from './components/detail-info/detail-info.component';
import { DetailInfoColComponent } from './components/detail-info-col/detail-info-col.component';
import { DetailInfoHeaderComponent } from './components/detail-info-header/detail-info-header.component';
import { DetailInfoRowComponent } from './components/detail-info-row/detail-info-row.component';
import { DetailInfoTitleComponent } from './components/detail-info-title/detail-info-title.component';

@NgModule({
    declarations: [
        DetailInfoComponent,
        DetailInfoRowComponent,
        DetailInfoColComponent,
        DetailInfoTitleComponent,
        DetailInfoHeaderComponent
    ],
    imports: [CommonModule],
    exports: [DetailInfoComponent, DetailInfoRowComponent, DetailInfoColComponent, DetailInfoTitleComponent, DetailInfoHeaderComponent]
})
export class DetailInfoModule {}
