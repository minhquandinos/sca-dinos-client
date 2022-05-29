import { Observable } from 'rxjs';

export interface BaseAuthServiceInterface {
    login(...args: any[]): Promise<any> | Observable<any>;
}
