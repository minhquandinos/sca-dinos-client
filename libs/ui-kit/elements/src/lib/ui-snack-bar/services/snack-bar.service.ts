import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { GlobalPositionStrategy } from '@angular/cdk/overlay/position/global-position-strategy';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';

import { ArrayUtil } from '@scaleo/utils';

import { UiSnackBarContainerComponent } from '../components/ui-snack-bar-container.component';
import type { SnackBarConfigModel } from '../models/snack-bar.model';
import { SnackBarConfigPositionType } from '../models/snack-bar.model';
import { SnackBarRef } from '../snack-bar.ref';
import { SNACKBAR_CONFIG_TOKEN } from '../tokens/snack-bar.token';
import { SnackBarPosition } from './snack-bar-position';

const DEFAULT_ID = Symbol('defaultId');

// TODO
// 1.send UiSnackBarRef to injector, need for dispose overlay inside UiSnackBarContainerComponent
// 2. add type 'info' | 'error' | 'success' and add scss style
// 3. add animation
// 4. add position
// 5. add multi snack-bar
// 7. add to UiSnackBarModule forRoot default config
// 6. remove ngx-toastr, and change to SnackBarService
@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    // private _overlay: OverlayRef;

    private _snackBars: Map<symbol, SnackBarRef> = new Map<symbol, SnackBarRef>();

    private _lastPosition: number;

    constructor(private readonly overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder) {}

    open(config: SnackBarConfigModel): void {
        // const positionStrategy = this.overlayPositionBuilder.global().bottom().centerHorizontally();
        const positionStrategy = this.getPositionStrategy(config?.positionVertically, config?.positionHorizontally);
        const injector = Injector.create({
            providers: [
                {
                    provide: SNACKBAR_CONFIG_TOKEN,
                    useValue: config
                }
            ]
        });

        const overlayRef = this.overlay.create({
            positionStrategy,
            panelClass: 'test-class'
        });

        const key = config?.id || DEFAULT_ID;
        if (this._snackBars.get(key) && config?.visibleEntities?.updated) {
            this.close(key);
        }

        if (!this._snackBars.get(key)) {
            const snackBarRef = new SnackBarRef(overlayRef);
            this._snackBars.set(key, snackBarRef);

            overlayRef.attach(new ComponentPortal(UiSnackBarContainerComponent, null, injector));
        }
    }

    close(id: symbol): void {
        if (this._snackBars.get(id)) {
            this._snackBars.get(id).close();
            this._snackBars.delete(id);
        }
    }

    closeAll(): void {
        if (this._snackBars.size) {
            this._snackBars.forEach((elem, key) => {
                elem.close();
                this._snackBars.delete(key);
            });
        }
    }

    private getPositionStrategy(vertically: SnackBarConfigPositionType, horizontally: SnackBarConfigPositionType): GlobalPositionStrategy {
        const overlay = this.overlayPositionBuilder.global();
        const shackBarPosition = new SnackBarPosition(overlay, vertically, horizontally);

        return shackBarPosition.place();
    }

    private get lastSnackBar(): SnackBarRef {
        if (this._snackBars.size) {
            const [, ref] = ArrayUtil.last([...this._snackBars.entries()]) || [undefined, undefined];
            return ref;
        }
        return undefined;
    }

    private get lastSnackBarPosition(): string {
        const lastToastIsVisible = this.lastSnackBar && this.lastSnackBar?.isVisible();
        const margin = 16;
        const lastPosition = 36;

        const rectHeight = this.lastSnackBar?.getPosition()?.height || 0;
        const elementHeight = this.lastSnackBar?.getElementRef()?.clientHeight || 0;
        const position = lastToastIsVisible ? rectHeight + elementHeight + lastPosition + margin : lastPosition;
        this._lastPosition = position;

        console.log(`${position}px`);
        return `${position}px`;
    }
}
