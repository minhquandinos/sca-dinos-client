import { Injector, TemplateRef, Type } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';

type SnackBarPositionType = 'top' | 'left' | 'bottom' | 'right';

export type SnackBarConfigPositionVerticallyType = SnackBarPositionType | 'centerVertically';

export type SnackBarConfigPositionHorizontallyType = SnackBarPositionType | 'centerHorizontally';

export interface SnackBarConfigPositionType {
    position: SnackBarConfigPositionHorizontallyType | SnackBarConfigPositionVerticallyType;
    margin?: string;
}

export interface SnackBarConfigModel {
    id?: symbol;
    type?: 'info'; // TODO complete
    text?: string;
    emptyContainer?: boolean;
    component?: {
        entity: Type<any>;
        injector?: Injector;
    };
    template?: {
        entity: TemplateRef<any>;
        context?: BaseObjectModel;
    };
    positionVertically?: SnackBarConfigPositionType;
    positionHorizontally?: SnackBarConfigPositionType;
    visibleEntities?: {
        counts?: number;
        updated?: boolean;
    };
    multi?: boolean;
    animation?: any; // TODO complete
}
