import { GlobalPositionStrategy } from '@angular/cdk/overlay/position/global-position-strategy';

import { BaseObjectModel, FunctionType } from '@scaleo/core/data';
import { SnackBarConfigPositionType } from '@scaleo/ui-kit/elements';

const DEFAULT_MARGIN = '1rem';
const DEFAULT_VERTICAL_POSITION = 'bottom';
const DEFAULT_HORIZONTAL_POSITION = 'centerHorizontally';

export class SnackBarPosition {
    private _overlayRef: GlobalPositionStrategy;

    constructor(
        private readonly overlay: GlobalPositionStrategy,
        private readonly vertically: SnackBarConfigPositionType,
        private readonly horizontally: SnackBarConfigPositionType
    ) {
        this._overlayRef = overlay;
    }

    place(): GlobalPositionStrategy {
        return this.horizontallyPlace().verticallyPlace().result();
    }

    private result(): GlobalPositionStrategy {
        return this._overlayRef;
    }

    private verticallyPlace(): this {
        const map: BaseObjectModel<string, FunctionType<GlobalPositionStrategy>> = {
            top: (value) => this._overlayRef.top(value),
            right: (value) => this._overlayRef.right(value),
            bottom: (value) => this._overlayRef.bottom(value),
            left: (value) => this._overlayRef.left(value),
            centerVertically: (value) => this._overlayRef.centerVertically(value)
        };

        const { position = DEFAULT_VERTICAL_POSITION, margin = DEFAULT_MARGIN } = this.vertically || {};

        if (typeof map?.[position] === 'function') {
            map?.[position](margin);
        }
        return this;
    }

    private horizontallyPlace(): this {
        const map: BaseObjectModel<string, FunctionType<GlobalPositionStrategy>> = {
            top: (value) => this._overlayRef.top(value),
            right: (value) => this._overlayRef.right(value),
            bottom: (value) => this._overlayRef.bottom(value),
            left: (value) => this._overlayRef.left(value),
            centerHorizontally: (value) => this._overlayRef.centerHorizontally(value)
        };

        const { position = DEFAULT_HORIZONTAL_POSITION, margin = DEFAULT_MARGIN } = this.horizontally || {};

        if (typeof map?.[position] === 'function') {
            map?.[position](margin);
        }
        return this;
    }
}
