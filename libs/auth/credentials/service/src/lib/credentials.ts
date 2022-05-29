import { CredentialsModel, StoreCredentialsType } from '@scaleo/auth/data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { ArrayUtil, Util } from '@scaleo/utils';

const CREDENTIALS = 'scaleo_credentials';

export class Credentials {
    private _credentialsMap: Map<DefaultRoleEnum, string> = new Map([...Credentials.initCredentials]);

    protected static transformToCredentialsModel(role: DefaultRoleEnum, accessToken: string): CredentialsModel {
        if (role && accessToken) {
            return {
                role: role,
                accessToken
            };
        }
        return undefined;
    }

    protected remove(key: DefaultRoleEnum): void {
        this._credentialsMap.delete(key);
        this.updateLocalStorage();
    }

    protected get(key: DefaultRoleEnum): CredentialsModel {
        const [role, accessToken] = this._credentialsMap.get(key);
        return Credentials.transformToCredentialsModel(role as DefaultRoleEnum, accessToken);
    }

    protected get currentCredential(): CredentialsModel {
        const [role = undefined, accessToken = undefined] = ArrayUtil.last([...this.entries]) || [];
        return Credentials.transformToCredentialsModel(role, accessToken);
    }

    protected get parentCredential(): CredentialsModel {
        const [role = undefined, accessToken = undefined] = ArrayUtil.first([...this.entries]) || [];
        return Credentials.transformToCredentialsModel(role, accessToken);
    }

    protected store(credentials: CredentialsModel): void {
        const { role, accessToken } = Credentials.transformToCredentialsModel(credentials?.role, credentials?.accessToken);
        this._credentialsMap.set(role, accessToken);
        this.updateLocalStorage();
    }

    protected clear(): void {
        this._credentialsMap.clear();
        localStorage.removeItem(CREDENTIALS);
    }

    private updateLocalStorage(): void {
        localStorage.setItem(CREDENTIALS, JSON.stringify([...this.entries]));
    }

    get entries(): StoreCredentialsType[] {
        return [...this._credentialsMap.entries()];
    }

    private static get initCredentials(): StoreCredentialsType[] {
        let credentials = Util.jsonParse(localStorage.getItem(CREDENTIALS), []);

        if (!Array.isArray(credentials) && typeof credentials === 'object') {
            const { role = undefined, accessToken = undefined } = (credentials as CredentialsModel) || {};
            if (role && accessToken) {
                credentials = [Object.values(Credentials.transformToCredentialsModel(role, accessToken))];
            } else {
                credentials = [];
            }
        }
        return credentials;
    }
}
