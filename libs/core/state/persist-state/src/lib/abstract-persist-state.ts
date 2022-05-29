export abstract class AbstractPersistState {
    abstract storageState(): any;

    abstract restoreState(initialState: any, savedRoleState: any): any;
}
