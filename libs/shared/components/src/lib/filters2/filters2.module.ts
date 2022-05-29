import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { Filter2PopupComponent } from './components/filter2-popup/filter2-popup.component';
import { Filters2Component } from './components/filters2/filters2.component';
import { Filters2OutputComponent } from './components/filters2-output/filters2-output.component';
import { SingleFilterComponent } from './components/single-filter/single-filter.component';
import { SingleFilterOutputComponent } from './components/single-filter-output/single-filter-output.component';
import { Filters2Service } from './services/filters2.service';

@NgModule({
    declarations: [SingleFilterComponent, Filters2Component, Filters2OutputComponent, SingleFilterOutputComponent, Filter2PopupComponent],
    imports: [CommonModule, SharedModule],
    exports: [Filters2Component, Filters2OutputComponent, SingleFilterComponent],
    providers: [Filters2Service]
})
export class Filters2Module {}
