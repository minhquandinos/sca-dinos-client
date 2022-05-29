import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

interface PlanStateModel {
    plan: string;
    permissions?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class PlanStore {
    private _store$: BehaviorSubject<PlanStateModel> = new BehaviorSubject<PlanStateModel>(undefined);

    constructor(private settingsQuery: PlatformSettingsQuery, private ngxPermissionsService: NgxPermissionsService) {}

    get permissions(): string[] {
        return this._store$.value.permissions;
    }

    get plan(): string {
        return this._store$.value.plan;
    }

    addPlan(plan: string): void {
        this._store$.next({
            plan
        });
        this.ngxPermissionsService.addPermission(plan);
    }

    addPlanWithPermissions(name: string, permissions: string[]): void {
        this.addPlan(name);
        this.addPermissions(permissions);
    }

    flushPlan(): void {
        this.ngxPermissionsService.removePermission(this.plan);
        this._store$.next({
            ...this.store,
            plan: undefined
        });
    }

    flushPlanAndPermissions(): void {
        this.permissions.forEach((permission) => {
            this.ngxPermissionsService.removePermission(permission);
        });
        this._store$.next(undefined);
    }

    private get store(): PlanStateModel {
        return this._store$.value;
    }

    private addPermissions(permissions: string[]): void {
        this._store$.next({
            ...this.store,
            permissions
        });
        this.ngxPermissionsService.addPermission(permissions);
    }
}
