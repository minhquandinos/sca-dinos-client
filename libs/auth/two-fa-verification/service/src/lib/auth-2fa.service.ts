import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthInterface, TwoFAConfig2Model } from '@scaleo/auth/data';
import { Util } from '@scaleo/utils';

@Injectable({ providedIn: 'root' })
export class Auth2faService {
    private _config2$: BehaviorSubject<TwoFAConfig2Model> = new BehaviorSubject<TwoFAConfig2Model>(null);

    submit(code: number): Observable<any> {
        const { service } = this.config2;
        return service.submit2Fa({ ...service.payload, code });
    }

    resendCode(): Observable<any> {
        const { service } = this.config2;
        return service.submit2FaRestCode(service.payload);
    }

    get config2(): TwoFAConfig2Model {
        return this._config2$.value;
    }

    setConfig2(service: AuthInterface): void {
        this._config2$.next({
            service
        });
    }

    check2fa(response: any = {}): boolean {
        if (Object.prototype.hasOwnProperty.call(response, 'twoFA_enabled')) {
            return Util.numToBoolean(response.twoFA_enabled);
        }
        return false;
    }
}
