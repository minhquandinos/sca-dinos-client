import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-link-group',
    templateUrl: './link-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkGroupComponent implements OnInit {
    @Input() className: string;

    @Input() oneElement: boolean;

    ngOnInit(): void {
        if (this.oneElement) {
            this.className += ' table__box-wrapper--one-element';
        }
    }
}
