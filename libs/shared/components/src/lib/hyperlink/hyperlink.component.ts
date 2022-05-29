import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { CheckPermissionService, PlatformPermissionsUnionType } from '@scaleo/platform/permission/role';

import { HyperlinkModel } from './hyperlink.model';

@Component({
    selector: 'app-hyperlink',
    templateUrl: './hyperlink.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HyperlinkComponent {
    @Input() set link(value: HyperlinkModel) {
        if (value) {
            this.setHyperlink(value);
        }
    }

    @Input() linkClassName: string;

    @Input() valueClassName: string;

    @Input() set permission(value: string | string[] | PlatformPermissionsUnionType | PlatformPermissionsUnionType[] | boolean) {
        if (typeof value === 'boolean') {
            this.permission$ = of(value);
        }

        if (value && typeof value !== 'boolean') {
            this.permission$ = this.checkPermission$(value);
        }
    }

    private _hyperlink$: BehaviorSubject<HyperlinkModel> = new BehaviorSubject<HyperlinkModel>(null);

    readonly hyperlink$ = this._hyperlink$.asObservable();

    permission$: Observable<boolean>;

    constructor(private checkPermissionService: CheckPermissionService) {}

    setHyperlink(value: HyperlinkModel) {
        this._hyperlink$.next(value);
    }

    checkPermission$(value: string | string[] | PlatformPermissionsUnionType | PlatformPermissionsUnionType[]): Observable<boolean> {
        if (value) {
            return this.checkPermissionService.check$(value);
        }

        return of(true);
    }
}
