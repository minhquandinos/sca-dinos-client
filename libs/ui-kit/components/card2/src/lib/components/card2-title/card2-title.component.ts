import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'scaleo-card2-title',
    templateUrl: './card2-title.component.html',
    styleUrls: ['./card2-title.component.scss']
})
export class Card2TitleComponent {
    @HostBinding('class') hostClass = 'card2-title';
}
