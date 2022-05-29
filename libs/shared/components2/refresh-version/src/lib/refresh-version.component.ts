import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { VersionService } from '@scaleo/core/version/service';

@Component({
    selector: 'scaleo-refresh-version',
    templateUrl: './refresh-version.component.html',
    styleUrls: ['./refresh-version.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
            transition(':leave', [animate(500, style({ opacity: 0 }))])
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class RefreshVersionComponent {
    @HostBinding('class') hostClass = 'app-refresh-version';

    readonly show: Observable<boolean> = this.versionService.show$;

    constructor(private readonly versionService: VersionService) {}

    refresh(): void {
        this.versionService.refresh();
    }
}
