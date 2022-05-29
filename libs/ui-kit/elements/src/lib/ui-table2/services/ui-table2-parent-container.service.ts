import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class UiTable2ParentContainerService {
    private _parentContainer: Element;

    constructor(@Inject(DOCUMENT) private document: HTMLDocument) {}

    setParentContainer(container: Element): void {
        this._parentContainer = container;
    }

    get parentContainer(): Element {
        return this._parentContainer;
    }

    // get paddingWidth(): number {
    //     if (this.parentContainer) {
    //         const styles = window.getComputedStyle(this.parentContainer);
    //         const paddingRight = styles['paddingRight'].replace(/\D/g, '');
    //         const paddingLeft = styles['paddingLeft'].replace(/\D/g, '');
    //         return +paddingRight + +paddingLeft + 5;
    //     }
    //     return 0;
    // }
}
