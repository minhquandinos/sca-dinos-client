export enum OffersLayoutContainersEnum {
    Footer = 'footer',
    Filter = 'filter',
    OpenModal = 'openModal',
    Hint = 'hint'
    // Upgrade = 'upgrade'
}

export type OffersLayoutContainersType = keyof Record<OffersLayoutContainersEnum, string>;
