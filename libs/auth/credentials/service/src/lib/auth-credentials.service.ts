import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CredentialsModel } from '@scaleo/auth/data';

import { Credentials } from './credentials';

@Injectable({
    providedIn: 'root'
})
export class AuthCredentialsService extends Credentials {
    private _credentials$: BehaviorSubject<CredentialsModel> = new BehaviorSubject<CredentialsModel>(undefined);

    readonly credentials$ = this._credentials$.asObservable();

    constructor() {
        super();
        this.initCredentials();
    }

    set(credentials: CredentialsModel): void {
        this._credentials$.next(Credentials.transformToCredentialsModel(credentials.role, credentials.accessToken));
        super.store(credentials);
    }

    clear(): void {
        super.clear();
        this._credentials$.next(undefined);
    }

    switchToParent(): void {
        this.remove(this.credentials.role);
        this._credentials$.next(this.currentCredential);
    }

    get credentials(): CredentialsModel {
        return this._credentials$.value;
    }

    get hasParentCredentials(): boolean {
        return this.entries.length > 1;
    }

    private initCredentials(): void {
        this._credentials$.next(this.currentCredential);
    }
}
