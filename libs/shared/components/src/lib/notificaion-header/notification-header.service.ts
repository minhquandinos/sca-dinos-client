import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationHeaderService {
    show = true;

    constructor() {}

    hide() {
        this.show = false;
    }
}
