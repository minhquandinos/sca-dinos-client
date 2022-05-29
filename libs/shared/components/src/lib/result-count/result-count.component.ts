import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-result-count',
    template: `
        {{ count | format: 'number' }}
        <ng-container *ngIf="!hideLabel">{{ title | async }}</ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultCountComponent implements OnInit {
    @HostBinding('class') hostClass = 'result-count d-flex align-items-center';

    @Input() count = 0;

    @Input() hideLabel: boolean;

    @Input() set labelKey(key: string) {
        if (key) {
            this.title = this.translate.stream(key);
        }
    }

    @Input() set className(value: string) {
        if (value) {
            this.hostClass = `${this.hostClass} ${value}`;
        }
    }

    title: Observable<string>;

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        if (!this.hideLabel) {
            this.title = this.translate.stream('interface.basic.results');
        }
    }
}
