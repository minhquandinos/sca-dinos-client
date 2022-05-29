import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Injectable({
    providedIn: 'root'
})
export class SharedMethodsService {
    constructor(
        public router: Router,
        private toastr: ToastrBarService,
        private translate: TranslateService,
        private activatedRoute: ActivatedRoute
    ) {}

    public generateFake(count: number): Array<number> {
        const indexes = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < count; i++) {
            indexes.push(i);
        }
        return indexes;
    }

    public copyToMemory(key: string, message: string): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = key;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        this.toastr.successes(this.translate.instant(message));
    }

    public checkQueryParams(paramForCheck: string): Observable<boolean> {
        return this.activatedRoute.queryParams.pipe(map((url: Params) => Boolean(url[paramForCheck])));
    }
}
