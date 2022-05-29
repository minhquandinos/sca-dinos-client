export enum AuthTypeEnum {
    Base = 'base',
    Base2FA = 'base2FA',
    RemoteLogin = 'remoteLogin',
    WorkspaceLogin = 'workspaceLogin'
}

export enum AuthTypeApiEndpointEnum {
    Base = 'login',
    Base2FA = 'two-fa-login',
    RemoteLogin = 'remote-login',
    WorkspaceLogin = 'login-by'
}
