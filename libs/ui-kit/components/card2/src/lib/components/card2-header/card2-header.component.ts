import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'scaleo-card2-header',
    templateUrl: './card2-header.component.html',
    styleUrls: ['./card2-header.component.scss']
})
export class Card2HeaderComponent implements OnInit {
    @HostBinding('class') hostClass = 'card2-header';

    constructor() {}

    ngOnInit(): void {}
}
