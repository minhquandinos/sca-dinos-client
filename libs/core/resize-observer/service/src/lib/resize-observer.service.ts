import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { ResizeObserverOutputModel } from './resize-observer.model';

@Injectable()
export class ResizeObserverService implements OnDestroy {
    private observer: ResizeObserver;

    private _observe$: BehaviorSubject<ResizeObserverOutputModel> = new BehaviorSubject<ResizeObserverOutputModel>(null);

    private hostElement: Element;

    observe(element: Element): Observable<ResizeObserverOutputModel> {
        this.hostElement = element;
        this.observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                this._observe$.next({
                    entry,
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            });
        });
        this.observer.observe(element);

        return this._observe$.pipe(
            filter((el) => !!el),
            debounceTime(300)
        );
    }

    ngOnDestroy(): void {
        this.observer?.unobserve(this.hostElement);
    }
}
