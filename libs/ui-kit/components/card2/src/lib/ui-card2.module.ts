import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Card2Component } from './components/card2/card2.component';
import { Card2ContentComponent } from './components/card2-content/card2-content.component';
import { Card2FooterComponent } from './components/card2-footer/card2-footer.component';
import { Card2HeaderComponent } from './components/card2-header/card2-header.component';
import { Card2TitleComponent } from './components/card2-title/card2-title.component';

const publicApi = [Card2Component, Card2TitleComponent, Card2ContentComponent, Card2FooterComponent, Card2HeaderComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...publicApi],
    exports: [...publicApi]
})
export class UiCard2Module {}
