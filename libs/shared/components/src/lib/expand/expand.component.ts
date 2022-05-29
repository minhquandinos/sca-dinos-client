import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TruncateTextPipe } from '@scaleo/shared/pipes';

import { ExpandService } from './services/expand.service';

@Component({
    selector: 'app-expand',
    templateUrl: './expand.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated,
    providers: [ExpandService, TruncateTextPipe]
})
export class ExpandComponent implements OnInit {
    @Input() expandText = 'interface.basic.expand';

    @Input() limitTextHeight: string = '2rem';

    @HostBinding('class') hostClass = 'expand-text';

    readonly opened$ = this.expandService.opened$;

    label$: Observable<string>;

    showExpandLabel$: Observable<boolean>;

    readonly isHtml$ = this.expandService.isHtml$;

    constructor(private readonly expandService: ExpandService, private readonly translate: TranslateService) {}

    ngOnInit() {
        this.label$ = this.getLabel$;
        this.showExpandLabel$ = this.getShowExpandLabel$;
    }

    showFullText(): void {
        this.expandService.opened = !this.expandService.opened;
    }

    private get getShowExpandLabel$(): Observable<boolean> {
        return combineLatest([this.expandService.limit$, this.expandService.textLength$]).pipe(
            map(([limit, textLength]) => textLength > limit)
        );
    }

    private get getLabel$(): Observable<string> {
        return this.opened$.pipe(
            switchMap((opened) => {
                const label = opened ? 'interface.basic.hide' : this.expandText;
                return this.translate.stream(label);
            })
        );
    }
}
