import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrackingRequestService {
    private _requests$: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>());

    private _id$ = new BehaviorSubject<symbol>(undefined);

    readonly requests$ = this._requests$.asObservable();

    add(url: string): void {
        this.trackingRequests.add(url);
        this._requests$.next(this.trackingRequests);
    }

    remove(url: string): void {
        this.trackingRequests.delete(url);
        this._requests$.next(this.trackingRequests);

        if (!this.trackingRequests.size) {
            this.id = undefined;
        }
    }

    set id(value: symbol) {
        this._id$.next(value);
    }

    get id(): symbol {
        return this._id$.value;
    }

    private get trackingRequests(): Set<string> {
        return this._requests$.value;
    }
}
