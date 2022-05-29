export interface PlatformUiModel {
    uiInterface: UiInterfaceType;
    collapseMenu: boolean;
    displayMobileMenu: boolean;
    collapseProfileOptions: boolean;
    roleUi: StorePageModel;
}

export type UiInterfaceType = typeof UI_INTERFACE[keyof typeof UI_INTERFACE];

export const UI_INTERFACE = {
    default: 'default',
    leads: 'leads'
} as const;

export interface StorePageModel<T = unknown> {
    [key: string]: T;
}
