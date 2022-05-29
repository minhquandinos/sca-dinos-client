import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthAsService {
    private _email$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    readonly email$ = this._email$.asObservable();

    constructor(private readonly router: Router) {}

    login(email: string): void {
        this._email$.next(email);
        this.router.navigate(['login-as']);
    }

    clear(): void {
        this._email$.next(undefined);
    }
}
