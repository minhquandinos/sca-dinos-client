import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BreadcrumbInterface } from '@scaleo/shared/data';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
    private _title$: BehaviorSubject<BreadcrumbInterface[]> = new BehaviorSubject<BreadcrumbInterface[]>([]);

    readonly title$ = this._title$.asObservable();

    get title(): string | BreadcrumbInterface[] {
        return this._title$.value;
    }

    setTitle(value: string | BreadcrumbInterface[]): void {
        let title: BreadcrumbInterface[] = [];
        if (typeof value === 'string') {
            title = [
                {
                    key: value,
                    link: null,
                    current: true
                }
            ];
        }

        if (Array.isArray(value)) {
            title = value;
        }

        this._title$.next(title);
    }

    main() {
        this.setTitle('dashboard');
    }

    clear() {
        this._title$.next(undefined);
    }
}
