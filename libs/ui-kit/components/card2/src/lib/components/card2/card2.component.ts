import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'scaleo-card2',
    templateUrl: './card2.component.html',
    styleUrls: ['./card2.component.scss']
})
export class Card2Component implements OnInit {
    @HostBinding('class') hostClass = 'card2';

    @HostBinding('class.card2--size-half') sizeHalfClass = false;

    @Input()
    set size(value: 'half' | string) {
        if (value === 'full' || !value) {
            this.sizeHalfClass = true;
        }

        if (value === 'half') {
            this.sizeHalfClass = true;
        }

        if (typeof value === 'string') {
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
