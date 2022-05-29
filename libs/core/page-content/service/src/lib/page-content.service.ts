import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, fromEvent, Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PageContentService {
    _pageContentRef: ElementRef;

    private _element$: BehaviorSubject<ElementRef> = new BehaviorSubject<ElementRef>(null);

    readonly element$ = this._element$.asObservable();

    readonly resize$ = this.element$.pipe(
        filter((element) => !!element),
        debounceTime(300),
        switchMap((element) => fromEvent(element.nativeElement, 'resize'))
    );

    setElementRef(element: ElementRef): void {
        this._element$.next(element);
    }

    get elementRef(): ElementRef {
        return this._element$.value;
    }

    get nativeElement(): HTMLElement {
        return this._element$.value?.nativeElement;
    }

    get scroll$(): Observable<Event> {
        return this.element$.pipe(
            switchMap((el) => {
                if (el) {
                    return fromEvent(el.nativeElement, 'scroll');
                }
                return EMPTY;
            }),
            map((e) => e as Event)
        );
    }
}
