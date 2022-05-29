import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiTable2ScrollService {
    private _scrollWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    readonly scrollWidth$ = this._scrollWidth$;

    private _scrollPosition$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    readonly scrollPosition$ = this._scrollPosition$.asObservable();

    private _tableContainer: ElementRef;

    private _scrollContainer: ElementRef;

    private _enabled = false;

    setScrollWidth(newWidth: number): void {
        this._scrollWidth$.next(newWidth);
    }

    get scrollWidth(): number {
        return this._scrollWidth$.value;
    }

    setTableContainer(container: ElementRef): void {
        this._tableContainer = container;
    }

    get tableContainer(): ElementRef {
        return this._tableContainer;
    }

    setScrollContainer(container: ElementRef): void {
        this._scrollContainer = container;
    }

    get scrollContainer(): ElementRef {
        return this._scrollContainer;
    }

    get scrollContainerWith(): number {
        return this.scrollContainer.nativeElement.clientWidth;
    }

    setScrollPosition(left: number): void {
        this._scrollPosition$.next(left);
    }

    get scrollPosition(): number {
        return this._scrollPosition$.value;
    }

    setEnabled() {
        this._enabled = true;
    }

    get enabled(): boolean {
        return this._enabled;
    }
}
