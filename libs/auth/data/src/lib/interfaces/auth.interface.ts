import { Observable } from 'rxjs';

export interface AuthInterface {
    payload: any;
    submit: (...args: any[]) => Observable<unknown>;
    submit2Fa: (...args: any[]) => Observable<unknown>;
    submit2FaRestCode: (...args: any[]) => Observable<unknown>;
}
