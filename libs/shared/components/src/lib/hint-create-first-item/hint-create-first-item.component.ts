import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-hint-create-first-item',
    templateUrl: './hint-create-first-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintCreateFirstItemComponent implements OnInit {
    @Input()
    nameList: 'offer' | 'advertiser' | 'affiliate';

    jsonPath: string;

    showHint = true;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.jsonPath = `getting_started.${this.nameList}.`;
    }

    close(): void {
        this.showHint = false;
        this.cdr.markForCheck();
    }
}
