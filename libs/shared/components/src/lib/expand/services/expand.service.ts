import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExpandService {
    private _opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly opened$ = this._opened$.asObservable();

    private readonly _limit$ = new BehaviorSubject<number>(null);

    readonly limit$ = this._limit$.asObservable();

    private readonly _text$ = new BehaviorSubject<string>('');

    private readonly _textLength$ = new BehaviorSubject<number>(null);

    readonly textLength$ = this._text$.pipe(map((text) => text.length));

    readonly isHtml$ = this._text$.pipe(map((text) => ExpandService.checkHtml(text)));

    get opened(): boolean {
        return this._opened$.value;
    }

    set opened(value: boolean) {
        this._opened$.next(value);
    }

    setLimit(limit: number): void {
        this._limit$.next(limit);
    }

    setText(text: string): void {
        this._text$.next(text);
    }

    setTextLength(text: string): void {
        this._textLength$.next(text.length);
    }

    get isHtml(): boolean {
        return ExpandService.checkHtml(this._text$.value);
    }

    private static checkHtml(text: string): boolean {
        return /<.*?>/.test(text);
    }
}
