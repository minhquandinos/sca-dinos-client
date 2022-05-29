export interface PermissionDataModel<P = string> {
    only?: P[];
    except?: P[];
}
