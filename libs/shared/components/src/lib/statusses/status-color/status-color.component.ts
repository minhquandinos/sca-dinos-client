import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-status-color',
    templateUrl: './status-color.component.html'
})
export class StatusColorComponent implements OnInit, OnChanges {
    @Input() status: string;

    public statusClass: string;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        const { status } = changes;

        if (status.currentValue) {
            this.statusClass = `status-${status.currentValue.toLowerCase()}`;
        }
    }
}
