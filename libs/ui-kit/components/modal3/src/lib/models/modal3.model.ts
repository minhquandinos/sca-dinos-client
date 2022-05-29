import { TemplateRef } from '@angular/core';

import { FunctionType } from '@scaleo/core/data';
import { ButtonType, UiButtonLinkColorType, UiButtonLinkIconSizeType } from '@scaleo/ui-kit/elements';

import { Modal3CloseEventEnum, Modal3ConfirmPresetEnum } from '../enums';

export interface BaseModal3ConfigModel<D> {
    data?: D | null;
}

export interface Modal3ConfigModel<D> extends BaseModal3ConfigModel<D> {
    disableClose?: boolean;
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    title?: string;
}

export type Modal3ConfigEditFormModel<D> = Pick<Modal3ConfigModel<D>, 'data' | 'disableClose'> & {
    wrapperClassName?: string;
    headerClassName?: string;
    contentClassName?: string;
};

export interface Modal3ConfigConfirmModel<D> extends Modal3ConfigModel<D> {
    typeButton?: ButtonType;
    actionLabel?: string;
    title?: string | Modal3ConfirmPresetEnum;
    footer?: Model3FooterModel;
}

export interface Modal3ConfigControlsModel {
    buttonType: ButtonType;
    label: string;
    eventName: string;
    size?: UiButtonLinkIconSizeType;
    color?: UiButtonLinkColorType;
    callback?: FunctionType;
}

export interface Modal3ConfigInfoModel<D> extends Modal3ConfigModel<D> {
    wrapperClassName?: string;
    innerClassName?: string;
    footer?: {
        template?: TemplateRef<any>;
        controls?: Modal3ConfigControlsModel[]; // TODO remove this code, use template and paste control inside template
    } & Model3FooterModel;
}

export interface Modal3CloseEvent<R> {
    type: keyof Record<Modal3CloseEventEnum, string> | string;
    data: R;
}

export interface Model3FooterModel {
    className?: string;
    borderTop?: boolean;
}
