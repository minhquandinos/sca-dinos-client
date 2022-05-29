import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SettingsCardService {
    private _showSaveButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly showSaveButton$ = this._showSaveButton$.asObservable();

    public saveSubject: Subject<boolean> = new Subject<boolean>();

    public changeShowSaveButton(value: boolean) {
        this._showSaveButton$.next(value);
    }
}
