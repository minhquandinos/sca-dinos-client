import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GettingStartedApi } from './getting-started.api';
import { GettingStartedCompleteModel, RoutesForGettingStarted } from './getting-started.model';

@Injectable()
export class GettingStartedService {
    private _showGettingStarted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    readonly showGettingStarted$ = this._showGettingStarted$;

    completeAllStages: boolean;

    private _routerMap$: BehaviorSubject<RoutesForGettingStarted[]> = new BehaviorSubject<RoutesForGettingStarted[]>([
        { title: 'account', router: 'account', complete: false, stage: 'getting_started_stage1' },
        { title: 'branding', router: 'branding', complete: false, stage: 'getting_started_stage2' },
        { title: 'offer', router: 'create-an-offer', complete: false, stage: 'getting_started_stage3' },
        {
            title: 'affiliate',
            router: 'create-an-affiliate',
            complete: false,
            stage: 'getting_started_stage4'
        }
    ]);

    readonly routerMap$ = this._routerMap$.asObservable();

    constructor(private router: Router, private api: GettingStartedApi) {}

    skip(route?: ActivatedRoute): void {
        const mapUrls = ['account', 'branding', 'create-an-offer', 'create-an-affiliate'];
        const currentPath = this.router.url.split('/');
        const currentIndexUrl = mapUrls.indexOf(currentPath[currentPath.length - 1]);
        const nextIndex = currentIndexUrl !== mapUrls.length - 1 ? currentIndexUrl + 1 : 0;

        this.router.navigate([`../../${mapUrls[nextIndex]}`], { relativeTo: route });
    }

    // checkBrandingPath(): boolean {
    //     return this.router.url === 'getting-started/branding';
    // }

    hideGettingStarted(): Observable<any> {
        // TODO fixed any
        return this.api.hideGettingStarted();
    }

    getCompleteStages(): Observable<GettingStartedCompleteModel> {
        return this.api.getCompleteStages().pipe(
            tap((res: GettingStartedCompleteModel) => {
                const routerMap: RoutesForGettingStarted[] = this._routerMap$.value.map((item: RoutesForGettingStarted) => {
                    item.complete = Boolean((res as any)?.[item.stage]);
                    return item;
                });

                this._routerMap$.next(routerMap);

                const [first, second] = this._routerMap$.value || [];
                this._showGettingStarted$.next(first?.complete && second?.complete);
                this.completeAllStages = this._routerMap$.value.every((step) => step.complete);
            })
        );
    }

    completeGettingStarted(stageId: number): Observable<void> {
        return this.api.completeGettingStarted(stageId);
    }
}
