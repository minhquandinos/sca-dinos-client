import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-not-found',
    template: `{{ text$ | async }}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
    @Input() set text(value) {
        if (value) {
            this.text$ = of(value);
        }
    }

    @HostBinding('class') className = 'd-block color__gray3';

    text$: Observable<string> = this.translate.stream('interface.basic.not_found');

    constructor(private translate: TranslateService) {}
}
