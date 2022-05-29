export type UiSimpleTableColType = 'right' | 'center';

export type UiSimpleTableColWidth = 'auto' | '100%' | 'fit-content' | 'max-content' | string;

export interface UiSimpleTableConfigModel {
    style?: {
        properties?: {
            colXPadding?: string;
        };
    };
}
