import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PreloadService {
    private _loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    loaded$ = this._loaded$.asObservable();

    setLoaded(value: boolean): void {
        this._loaded$.next(value);
    }

    get loaded(): boolean {
        return this._loaded$.value;
    }
}
