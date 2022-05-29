import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { map, Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';

@Injectable({
    providedIn: 'root'
})
export class CheckPermissionService {
    constructor(private ngxPermissionsService: NgxPermissionsService) {}

    check(name: string | string[], type: 'some' | 'every' = 'some'): boolean {
        const check = (permissionName: string) => Object.keys(this.ngxPermissionsService.getPermissions()).includes(permissionName);

        if (Array.isArray(name)) {
            if (type === 'every') {
                return name.every((elemName) => check(elemName));
            } else {
                return name.some((elemName) => check(elemName));
            }
        }

        return check(name);
    }

    check$(name: string | string[], type: 'some' | 'every' = 'some'): Observable<boolean> {
        return this.ngxPermissionsService.permissions$.pipe(
            map((permissions) => {
                if (Array.isArray(name)) {
                    const fn = (elem: string) => !!permissions?.[elem];
                    const typeMap: BaseObjectModel<string, boolean> = {
                        some: name.some(fn),
                        every: name.every(fn)
                    };
                    return typeMap[type] || false;
                }
                return !!permissions?.[name];
            })
        );
    }
}
