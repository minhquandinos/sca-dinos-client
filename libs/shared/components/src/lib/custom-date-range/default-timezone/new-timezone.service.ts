import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NewTimezoneService {
    timezone: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {}
}
