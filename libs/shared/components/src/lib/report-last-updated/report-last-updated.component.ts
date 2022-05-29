import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { repeatWhen, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-report-last-updated',
    templateUrl: './report-last-updated.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportLastUpdatedComponent {
    @Input() set updateTimer(value: boolean) {
        if (!value) {
            this.updated();
        }
    }

    @Output() refreshed: EventEmitter<void> = new EventEmitter<void>();

    private readonly delay: number = 1000 * 60;

    private readonly _restartTimer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public restart$: Subject<boolean> = new Subject<boolean>();

    public translateLabel$: Observable<string> = this._restartTimer$.pipe(
        switchMap((restart: boolean) => (restart ? this.timerLabel$ : EMPTY))
    );

    private timerLabel$: Observable<string> = timer(0, this.delay).pipe(
        switchMap((minutes: number) => this.translate.stream('reports_page.last_updated', { minutes })),
        repeatWhen((): any => this._restartTimer$)
    );

    @HostBinding('class') hostClass = 'report-last-updated d-flex align-items-center';

    constructor(private translate: TranslateService) {}

    public updated(): void {
        this._restartTimer$.next(true);
    }

    public refresh(): void {
        this.restart$.next(true);

        this.refreshed.emit();
    }
}
