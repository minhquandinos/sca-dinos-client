import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';

import { PageTitleComponent } from './page-title.component';

@NgModule({
    declarations: [PageTitleComponent],
    imports: [CommonModule, RouterModule, SharedModule]
})
export class PageTitleModule {}
