import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { BehaviorSubject, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EnvModel } from './env.model';
import { ENV_DEV_SERVER_URL_TOKEN } from './env.token';

interface GetEndpointModel {
    code: number;
    info: EnvModel;
}

@Injectable({ providedIn: 'root' })
export class EnvService {
    private _serverUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private _trial: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _trialTimestamp: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient, @Optional() @Inject(ENV_DEV_SERVER_URL_TOKEN) private readonly devServerUrl: string) {}

    get serverUrl(): string {
        return this._serverUrl.value;
    }

    get trial(): boolean {
        return this._trial.value;
    }

    get trialTimestamp(): number {
        return this._trialTimestamp.value;
    }

    private getEndpoint(): Promise<GetEndpointModel> {
        const headers = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Pragma: 'no-cache',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Expires: '0',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http
            .get('https://set.scaletrk.com/installer/default/get-end-point', {
                headers,
                responseType: 'json'
            })
            .pipe(
                map((response) => response as GetEndpointModel),
                catchError((error) => throwError(error))
            )
            .toPromise();
    }

    async initEnv(): Promise<void> {
        try {
            const response = await this.getEndpoint();
            const { info, code } = response || {};

            if (code !== 200) {
                throw new Error('No endpoint');
            }

            const endpoint: EnvModel = info;
            const serverUrl = isDevMode() ? this.devServerUrl : `https://${endpoint['end-point']}`;

            this._trial.next(endpoint.trial);
            this._trialTimestamp.next(endpoint['trial-timestamp']);

            this._serverUrl.next(serverUrl);
        } catch (e) {
            console.log(e);
        }
    }
}
