export abstract class PersistStateInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static preStorageUpdate = (storeName: string, state: any): void => {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static preStoreUpdate = (storeName: string, state: any, initialState: any): any => {};
}

export interface PersistStoreUpdateInterface {
    storeUpdate(): any;
}
